import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react-native";
import styles from "./ProjectFilter.styles";
import { theme } from "../../../../styles/theme";
import categoryColors from "../../../../assets/categoryColors";

const CATEGORIES = [
  "전체",
  "모바일",
  "웹",
  "IoT",
  "도구",
  "AI",
  "기타",
];

const TAGS = [
  "React Native",
  "ARKit",
  "TypeScript",
  "Next.js",
  "PostgreSQL",
  "Stripe",
  "Python",
  "Raspberry Pi",
  "Three.js",
  "WebGL",
  "TensorFlow",
  "OpenCV",
  "Vue.js",
  "Firebase",
  "기타",
];

export default function ProjectFilter({
  selectedCategory,
  onSelectCategory,
  selectedTags,
  onToggleTag,
}) {
  const { colors } = theme;
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity 
        style={styles.headerRow} 
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SlidersHorizontal size={18} color="#1A1A1A" />
            <Text style={styles.filterTitle}>필터</Text>
        </View>
        {isExpanded ? (
            <ChevronUp size={20} color="#1A1A1A" />
        ) : (
            <ChevronDown size={20} color="#1A1A1A" />
        )}
      </TouchableOpacity>

      {isExpanded && (
        <>
            {/* Categories */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
                contentContainerStyle={styles.categoryContainer}
            >
                {CATEGORIES.map((cat) => {
                    const isActive = selectedCategory === cat;
                    const activeColor = cat === "전체" 
                        ? colors.primary 
                        : (categoryColors[cat] || colors.primary);
                    
                    return (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryBtn,
                                isActive && { 
                                    backgroundColor: activeColor,
                                    borderColor: activeColor 
                                },
                            ]}
                            onPress={() => onSelectCategory(cat)}
                        >
                            <Text style={[
                                styles.categoryText, 
                                isActive && { color: "#FFFFFF", fontWeight: "bold" }
                            ]}>
                            {cat}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Tags */}
            <View style={styles.tagContainer}>
                {TAGS.map((tag) => {
                const isActive = selectedTags.includes(tag);
                return (
                    <TouchableOpacity
                    key={tag}
                    style={[styles.tagBadge, isActive && styles.tagBadgeActive]}
                    onPress={() => onToggleTag(tag)}
                    >
                    <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                );
                })}
            </View>
        </>
      )}
    </View>
  );
}
