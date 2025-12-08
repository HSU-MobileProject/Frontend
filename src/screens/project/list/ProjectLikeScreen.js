import React, { useState, useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProjectCard from "./components/ProjectCard";
import ProjectFilter from "./components/ProjectFilter";
import styles from "./ProjectList.styles";
import useProjects from "../../../hooks/useProjects";
import Colors from "../../../assets/colors";

export default function ProjectLikeScreen() {
  const navigation = useNavigation();
  const { likedProjects } = useProjects();
  
  const scrollRef = useRef(null);

  // Filter State
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredData = useMemo(() => {
    return likedProjects.filter((p) => {
      if (selectedCategory !== "전체" && p.category !== selectedCategory) {
        return false;
      }
      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every((tag) => p.tags?.includes(tag));
        if (!hasAllTags) return false;
      }
      return true;
    });
  }, [likedProjects, selectedCategory, selectedTags]);

  const handleToggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSelectCategory = (cat) => {
      setSelectedCategory(cat);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProjectFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            selectedTags={selectedTags}
            onToggleTag={handleToggleTag}
        />

        {filteredData.map((item) => (
          <ProjectCard
            key={item.id}
            project={item}
            onPress={() =>
              navigation.navigate("ProjectDetail", { project: item })
            }
            onPurchasePress={() => handlePurchasePress(item)}
            isLiked={item.isLiked}
          />
        ))}

        {filteredData.length === 0 && (
            <View style={{ padding: 20, alignItems: 'center', marginTop: 50 }}>
                <Text style={{ color: Colors.grayDark }}>
                    {likedProjects.length === 0 
                        ? "즐겨찾기한 프로젝트가 없습니다." 
                        : "조건에 맞는 프로젝트가 없습니다."}
                </Text>
            </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
