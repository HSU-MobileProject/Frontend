/**
 * Payment Service
 * Handles payment processing logic.
 * Currently mocks the API call.
 */

export const paymentService = {
  /**
   * Process a payment.
   * @param {Object} paymentData - The payment details.
   * @param {string} paymentData.method - 'card', 'transfer', 'easy'
   * @param {number} paymentData.amount - Total amount
   * @param {Object} paymentData.project - Project info
   * @returns {Promise<Object>} - Resolves with transaction result
   */
  processPayment: async (paymentData) => {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success (90% chance)
        const isSuccess = Math.random() > 0.1;

        if (isSuccess) {
          resolve({
            success: true,
            transactionId: `tx_${Date.now()}`,
            message: "결제가 성공적으로 완료되었습니다.",
            timestamp: new Date().toISOString(),
          });
        } else {
          reject({
            success: false,
            message: "결제 처리에 실패했습니다. 다시 시도해주세요.",
          });
        }
      }, 1500); // 1.5s delay
    });
  },
};
