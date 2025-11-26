import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { ChevronLeft, Pencil } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./ProjectDetail.styles";

export default function DetailHeader({ project }) {
  const navigation = useNavigation();
  const isMyProject = true;

  return (
    <View style={styles.headerWrap}>
      
      {/* 돌아가기 */}
      <TouchableOpacity
        style={styles.headerBackBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <ChevronLeft size={18} color="#1A1A1A" />
        <Text style={styles.headerBackText}>돌아가기</Text>
      </TouchableOpacity>

      {/* 수정하기 */}
      {isMyProject && (
        <TouchableOpacity style={styles.headerEditBtn} activeOpacity={0.8}>
          <Pencil size={16} color="#1A1A1A" />
          <Text style={styles.headerEditText}>수정하기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}