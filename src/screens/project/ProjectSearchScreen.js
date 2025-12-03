import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Search } from "lucide-react-native";
import styles from "./ProjectSearch.styles";
import { theme } from "../../styles/theme";
import ProjectFilter from "./components/ProjectFilter";
import ProjectCard from "./components/ProjectCard";
import useProjects from "../../hooks/useProjects";

export default function ProjectSearchScreen({ navigation }) {
  const { projects } = useProjects();
  
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedTags, setSelectedTags] = useState([]);

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // 1. Category Filter
      if (selectedCategory !== "전체" && p.category !== selectedCategory) {
        return false;
      }

      // 2. Tag Filter (OR logic: match any selected tag)
      if (selectedTags.length > 0) {
        const hasTag = p.tags.some((t) => selectedTags.includes(t));
        if (!hasTag) return false;
      }

      // 3. Search Text Filter (Title, Description, Tags)
      if (searchText.trim()) {
        const query = searchText.toLowerCase();
        const titleMatch = p.title.toLowerCase().includes(query);
        const descMatch = p.description.toLowerCase().includes(query);
        const tagMatch = p.tags.some(t => t.toLowerCase().includes(query));
        
        if (!titleMatch && !descMatch && !tagMatch) return false;
      }

      return true;
    });
  }, [projects, selectedCategory, selectedTags, searchText]);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
  };

  const handleToggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.safeArea}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.grayDark} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="프로젝트 이름, 설명, 태그로 검색..."
            placeholderTextColor={theme.colors.grayDark}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Filter */}
        <View style={styles.filterSection}>
          <ProjectFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            selectedTags={selectedTags}
            onToggleTag={handleToggleTag}
          />
        </View>

        {/* Results Header */}
        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>검색 결과</Text>
          <Text style={styles.resultCount}>({filteredProjects.length}개)</Text>
        </View>

        {/* Results List */}
        <View style={styles.listContainer}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onPress={() => navigation.navigate("ProjectDetail", { project })}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
