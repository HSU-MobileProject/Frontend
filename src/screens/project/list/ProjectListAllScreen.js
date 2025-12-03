import React, { useState, useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProjectCard from "./components/ProjectCard";
import styles from "./ProjectList.styles";
import useProjects from "../../../hooks/useProjects";

import PaymentModal from "../../payment/PaymentModal";

export default function ProjectListAllScreen({ route }) {
  const navigation = useNavigation();   
  const { type } = route.params;
  const { getAllProjects } = useProjects();

  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const scrollRef = useRef(null);

  const sortedData = useMemo(() => {
    return getAllProjects(type);
  }, [type, getAllProjects]);

  const PAGE_SIZE = 5;
  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);

  const [page, setPage] = useState(1);

  const currentData = sortedData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handlePurchasePress = (project) => {
    setSelectedProject(project);
    setIsPaymentModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {currentData.map((item) => (
          <ProjectCard
            key={item.id}
            project={item}
            onPress={() =>
              navigation.navigate("ProjectDetail", { project: item })
            }
            onPurchasePress={() => handlePurchasePress(item)}
          />
        ))}

        {/* 페이지네이션 영역 */}
        <View style={styles.paginationWrapper}>
          {/* 이전 버튼 */}
          <TouchableOpacity
            disabled={page === 1}
            onPress={() => handlePageChange(page - 1)}
          >
            <Text style={[styles.pageButton, page === 1 && styles.disabledButton]}>
              이전
            </Text>
          </TouchableOpacity>

          {/* 숫자 버튼 */}
          {Array.from({ length: totalPages }).map((_, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handlePageChange(idx + 1)}
            >
              <Text
                style={[
                  styles.pageNumber,
                  page === idx + 1 && styles.pageActive,
                ]}
              >
                {idx + 1}
              </Text>
            </TouchableOpacity>
          ))}

          {/* 다음 버튼 */}
          <TouchableOpacity
            disabled={page === totalPages}
            onPress={() => handlePageChange(page + 1)}
          >
            <Text
              style={[
                styles.pageButton,
                page === totalPages && styles.disabledButton,
              ]}
            >
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <PaymentModal 
        visible={isPaymentModalVisible} 
        onClose={() => setIsPaymentModalVisible(false)}
        project={selectedProject}
      />
    </SafeAreaView>
  );
}