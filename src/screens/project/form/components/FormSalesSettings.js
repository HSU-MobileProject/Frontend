import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import Colors from "../../../../assets/colors";
import styles from "../ProjectCreate.styles";

const LICENSE_OPTIONS = [
  {
    key: "personal",
    label: "개인 사용 라이선스",
    desc: "개인 프로젝트나 학습 목적으로만 사용 가능",
  },
  {
    key: "business",
    label: "상업용 라이선스",
    desc: "상업적 목적으로 자유롭게 사용 가능",
  },
  {
    key: "enterprise",
    label: "기업용 라이선스",
    desc: "기업용으로 무제한 사용 및 재배포 가능",
  },
];

export default function FormSalesSettings({
  isForSale,
  setIsForSale,
  price,
  setPrice,
  licenseKey,
  setLicenseKey,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>판매 설정</Text>

      <View style={styles.rowBetween}>
        <Text style={styles.fieldLabel}>소스 코드 판매</Text>

        <Switch
          value={isForSale}
          onValueChange={setIsForSale}
          thumbColor={isForSale ? Colors.green : "#f4f3f4"}
          trackColor={{
            false: "#D1D5DB",
            true: "#A7F3D0",
          }}
        />
      </View>

      {isForSale && (
        <>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>가격</Text>

            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
              placeholder="0"
            />
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>라이선스</Text>
            {LICENSE_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.key}
                style={[
                  styles.licenseItem,
                  licenseKey === opt.key && styles.licenseItemActive,
                ]}
                onPress={() => setLicenseKey(opt.key)}
              >
                <View style={styles.licenseDotWrap}>
                  <View
                    style={[
                      styles.licenseDot,
                      licenseKey === opt.key && styles.licenseDotActive,
                    ]}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.licenseTitle,
                      licenseKey === opt.key && styles.licenseTitleActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                  <Text style={styles.licenseDesc}>{opt.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
