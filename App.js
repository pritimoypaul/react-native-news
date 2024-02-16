import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const secret_key = process.env.NEWS_API_KEY;

export default function App() {
  const [news, setNews] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [topic, setTopic] = useState("bitcoin");

  const getNews = async () => {
    try {
      setLoading(true);
      let data = await axios.get(
        `https://newsapi.org/v2/everything?q=${topic}&apiKey=9123cabfb7484d74b6cc9a7f6274b324`
      );

      setNews(data.data.articles);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <View className="flex-1 w-full bg-slate-100">
      <View className="ml-[20] mr-[20]">
        <StatusBar style="auto" />
        {/* Main Design Starts from here */}
        <SafeAreaView>
          <View>
            <Text className="text-center font-bold text-xl">The Portal</Text>
          </View>
          <View className="my-6 flex-row">
            <View className="p-3 flex-1 bg-white rounded-full">
              <TextInput
                placeholder="Search News..."
                onChangeText={(e) => {
                  setTopic(e);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                getNews();
              }}
            >
              <View className="ml-2 flex-row justify-center items-center h-[50] w-[50] bg-blue-700 rounded-full">
                <AntDesign name="arrowright" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              news.map((article) => (
                <View key={article?.title} className="rounded-lg bg-white my-4">
                  <Image
                    className="w-full h-[200] rounded-t-lg"
                    source={{
                      uri: article?.urlToImage,
                    }}
                  />
                  <View className="p-2">
                    <Text className="mt-2 font-bold text-xl">
                      {article?.title}
                    </Text>
                    <View className="mt-1 flex-row justify-between items-center">
                      <Text className="font-bold">
                        Source: {article?.source?.name}
                      </Text>
                      <Text className="font-bold">
                        Author: {article?.author}
                      </Text>
                    </View>
                    <Text className="mt-2">{article?.description}</Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}
