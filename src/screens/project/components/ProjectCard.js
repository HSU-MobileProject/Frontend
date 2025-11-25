// src/components/project/ProjectCard.jsx
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
import styles from "./ProjectCard.styles";
import categoryColors from "../../../assets/categoryColors";
import Colors from "../../../assets/colors";
import { Star, Eye } from "lucide-react-native";

const { width } = Dimensions.get("window");
const scale = width / 409;

const ProjectCard = ({
  category,
  title,
  description,
  tags,
  likes,
  views,
  price,
  thumbnail,
}) => {

  // 매핑에 없으면 green 사용
  const badgeColor = categoryColors[category] || categoryColors["기타"];

  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.cardOuter}>

        {/* 썸네일 있을 때만 보여줌 */}
        {thumbnail && (
          <Image
            source={{ uri: thumbnail }}
            style={styles.topImage}
            resizeMode="cover"
          />
        )}

        <View style={styles.bottomCard}>

          {/* 배지 + 통계 */}
          <View style={styles.headerRow}>
            <View style={[styles.badge, { backgroundColor: badgeColor }]}>
              <Text style={styles.badgeText}>{category}</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Star size={16 * scale} color={Colors.grayDark} />
                <Text style={styles.statTextOutline}>{likes}</Text>
              </View>

              <View style={styles.statItem}>
                <Eye size={16 * scale} color={Colors.grayDark} />
                <Text style={styles.statTextOutline}>{views}</Text>
              </View>
            </View>
          </View>

          {/* 제목 */}
          <Text style={styles.title}>{title}</Text>

          {/* 설명 */}
          <Text style={styles.description}>{description}</Text>

          {/* 태그 */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagScroll}
          >
            <View style={styles.tagContainer}>
              {tags.map((tag, i) => (
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.divider} />

          {/* 가격 + 구매 버튼 */}
          <View style={styles.footerRow}>
            <Text style={styles.priceLabel}>가격</Text>
            <Text style={styles.priceValue}>{price}</Text>

            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>구매</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
};

export default ProjectCard;