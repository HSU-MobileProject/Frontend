import { useState } from 'react';

export default function usePaymentModal() {
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [paymentProject, setPaymentProject] = useState(null);

  const openPaymentModal = (project) => {
    setPaymentProject(project);
    setIsPaymentModalVisible(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalVisible(false);
    setPaymentProject(null);
  };

  return {
    isPaymentModalVisible,
    paymentProject,
    openPaymentModal,
    closePaymentModal,
  };
}
