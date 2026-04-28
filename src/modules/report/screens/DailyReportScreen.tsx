import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { db } from '../../../db/db';
import { sales, saleItems, products } from '../../../db/schema';
import { sql, eq } from 'drizzle-orm';

export default function DailyReportScreen() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ total: 0, count: 0 });
  const [topItems, setTopItems] = useState<any[]>([]);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      // 1. Fetch Total Sales & Count for today
      const salesToday = await db.select({
        total: sql<number>`sum(${sales.totalAmount})`,
        count: sql<number>`count(${sales.id})`,
      })
      .from(sales)
      .where(sql`${sales.createdAt} >= ${startOfDay.getTime()}`)
      .all();

      setSummary({
        total: salesToday[0]?.total || 0,
        count: salesToday[0]?.count || 0,
      });

      // 2. Fetch Top Items (simple join and group by)
      const items = await db.select({
        name: products.name,
        qty: sql<number>`sum(${saleItems.quantity})`,
      })
      .from(saleItems)
      .innerJoin(sales, eq(saleItems.saleId, sales.id))
      .innerJoin(products, eq(saleItems.productId, products.id))
      .where(sql`${sales.createdAt} >= ${startOfDay.getTime()}`)
      .groupBy(products.id)
      .orderBy(sql`sum(${saleItems.quantity}) desc`)
      .limit(5)
      .all();

      setTopItems(items);
    } catch (error) {
      console.error('Failed to fetch report', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#2563eb" className="flex-1" />;
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 p-6">
      <Text className="text-2xl font-bold mb-6">Laporan Hari Ini</Text>

      {/* Summary Cards */}
      <View className="flex-row justify-between mb-8">
        <View className="bg-white p-6 rounded-3xl flex-1 mr-2 shadow-sm border border-gray-100">
          <Text className="text-gray-500 mb-1">Total Omzet</Text>
          <Text className="text-xl font-black text-blue-700">Rp {summary.total.toLocaleString()}</Text>
        </View>
        <View className="bg-white p-6 rounded-3xl flex-1 ml-2 shadow-sm border border-gray-100">
          <Text className="text-gray-500 mb-1">Transaksi</Text>
          <Text className="text-xl font-black text-purple-700">{summary.count}</Text>
        </View>
      </View>

      {/* Top Items Section */}
      <View className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <Text className="text-lg font-bold mb-4">Produk Terlaris</Text>
        {topItems.length > 0 ? (
          topItems.map((item, index) => (
            <View key={index} className="flex-row justify-between py-3 border-b border-gray-50 last:border-0">
              <Text className="text-gray-700 font-medium">{item.name}</Text>
              <Text className="font-bold text-blue-600">{item.qty} pcs</Text>
            </View>
          ))
        ) : (
          <Text className="text-gray-400 text-center py-4">Belum ada data penjualan</Text>
        )}
      </View>
    </ScrollView>
  );
}
