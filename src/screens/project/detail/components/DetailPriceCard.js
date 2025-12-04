import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ShoppingCart } from "lucide-react-native";
import styles from "./ProjectDetail.styles";
import Colors from "../../../../assets/colors";

export default function DetailPriceCard({ project }) {
  const isFree =
    project.priceType === "free" ||
    project.price === 0 ||
    project.price === "무료";

  const priceText = isFree
    ? "무료"
    : `${Number(project.price).toLocaleString()}원`;

  // 라이선스 & 포함항목
  const licenseType = project.licenseType || "개인 · 교육용 라이선스";
  const includes = project.includes || ["소스코드", "설치 문서", "기술 자료"];

  return (
    <View style={[styles.card, styles.priceCard]}>
      <View style={styles.cardContent}>
        {/* 제목 */}
        <Text style={styles.sectionTitleCenter}>프로젝트 가격</Text>

        {/* 가격 */}
        <Text style={styles.priceValue}>{priceText}</Text>

        {/* 구매 버튼 */}
        <TouchableOpacity style={styles.bigBuyBtn} activeOpacity={0.9}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <ShoppingCart size={16} color={Colors.white} />
            <Text style={styles.bigBuyBtnText}>
              {isFree ? "다운로드" : "구매하기"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* 서브 텍스트 */}
        {!isFree && (
          <Text style={styles.priceSubText}>
            즉시 다운로드 및 소스코드 제공
          </Text>
        )}

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 라이선스 */}
        <Text style={styles.sectionBody}>
          <Text style={{ color: Colors.black }}>라이선스: </Text>
          {"\u00A0"}
          {licenseType}
        </Text>

        {/* 포함 사항 리스트 */}
        <Text style={[styles.sectionBody, { marginTop: 6 }]}>포함사항</Text>
        {includes.map((item, idx) => (
          <Text key={idx} style={styles.detailBulletItem}>
            • {item}
          </Text>
        ))}
      </View>
    </View>
  );
}