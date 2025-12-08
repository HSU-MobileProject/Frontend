import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { X, Check } from 'lucide-react-native';
import Colors from '../../../../assets/colors';

export default function ApplicationModal({ visible, onClose, roles, onApply }) {
  const [selectedRole, setSelectedRole] = useState(null);

  // 모집 중인 역할만 필터링
  const recruitingRoles = roles?.filter(role => role.status === 'recruiting') || [];

  const handleApply = () => {
    if (selectedRole) {
      onApply(selectedRole);
      setSelectedRole(null); // 초기화
    }
  };

  const handleClose = () => {
      setSelectedRole(null);
      onClose();
  }

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>지원할 역할 선택</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color={Colors.black} />
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>
            프로젝트에 참여하고 싶은 역할을 선택해주세요.
          </Text>

          {/* Role List */}
          <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
            {recruitingRoles.length > 0 ? (
              recruitingRoles.map((role, index) => {
                const isSelected = selectedRole?.name === role.name;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.roleItem,
                      isSelected && styles.roleItemSelected,
                    ]}
                    onPress={() => setSelectedRole(role)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.roleName,
                        isSelected && styles.roleNameSelected,
                      ]}
                    >
                      {role.name}
                    </Text>
                    {isSelected && <Check size={20} color={Colors.primary} />}
                  </TouchableOpacity>
                );
              })
            ) : (
               <View style={styles.emptyContainer}>
                   <Text style={styles.emptyText}>현재 모집 중인 역할이 없습니다.</Text>
               </View>
            )}
          </ScrollView>

          {/* Apply Button */}
          <TouchableOpacity
            style={[
              styles.applyButton,
              (!selectedRole || recruitingRoles.length === 0) && styles.applyButtonDisabled
            ]}
            onPress={handleApply}
            disabled={!selectedRole || recruitingRoles.length === 0}
          >
            <Text style={styles.applyButtonText}>지원하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center', // Center vertically
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
  },
  closeButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.grayDark,
    marginBottom: 20,
  },
  listContainer: {
    maxHeight: 240, // Limit height if too many roles
    marginBottom: 24,
  },
  roleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    marginBottom: 10,
    backgroundColor: Colors.white,
  },
  roleItemSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#F0F9FF', // Light primary color
  },
  roleName: {
    fontSize: 16,
    color: Colors.grayDark,
    fontWeight: '500',
  },
  roleNameSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
  emptyContainer: {
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
  },
  emptyText: {
      color: Colors.grayDark,
      fontSize: 14,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonDisabled: {
    backgroundColor: Colors.grayLight,
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
