import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Button, StyleSheet, Alert, Modal, Platform } from 'react-native';
import { useCart } from './CartContext';
import { useUser } from './UserContext';
import { useLanguage } from './LanguageContext';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function CartScreen({ isDarkMode = false }) {
  const { user } = useUser();
  const { t } = useLanguage();
  const { cartItems, subtotal, updateItemQuantity, removeFromCart, clearCart, completePurchase } = useCart();
  const [showConfirmPurchase, setShowConfirmPurchase] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  const requestNotificationPermissions = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permiso de notificaciones denegado');
    }
  };

  const sendPurchaseNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '¡Gracias por tu compra! 🎉',
        body: `Tu pedido de $${subtotal.toFixed(2)} ha sido procesado con éxito`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: null, // Notificación inmediata
    });
  };

  const handlePurchase = () => {
    if (cartItems.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega productos al carrito antes de comprar');
      return;
    }
    setShowConfirmPurchase(true);
  };

  const confirmPurchase = async () => {
    setShowConfirmPurchase(false);
    const success = await completePurchase(user.id);
    if (success) {
      await sendPurchaseNotification();
      setShowSuccess(true);
    } else {
      Alert.alert('Error', 'No se pudo procesar la compra');
    }
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    setShowConfirmClear(true);
  };

  const confirmClear = () => {
    setShowConfirmClear(false);
    clearCart();
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' }]}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: isDarkMode ? '#fff' : '#000' }]}>{item.name}</Text>
        <Text style={[styles.price, { color: isDarkMode ? '#03DAC6' : '#333' }]}>${(item.price).toFixed(2)}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: isDarkMode ? '#2a2a2a' : '#eee' }]} onPress={() => updateItemQuantity(item.id, -1)}>
            <Text style={[styles.qtyText, { color: isDarkMode ? '#fff' : '#000' }]}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.qty, { color: isDarkMode ? '#fff' : '#000' }]}>{item.quantity || 1}</Text>
          <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: isDarkMode ? '#2a2a2a' : '#eee' }]} onPress={() => updateItemQuantity(item.id, 1)}>
            <Text style={[styles.qtyText, { color: isDarkMode ? '#fff' : '#000' }]}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.remove}>
            <Text style={{ color: 'red' }}>{t('remove') || 'Eliminar'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#0d1117' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{t('myCart')} ({cartItems.length})</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={[styles.empty, { color: isDarkMode ? '#bbb' : '#666' }]}>{t('emptyCartMessage')}</Text>}
      />
      <View style={[styles.footer, { borderTopColor: isDarkMode ? '#2a2a2a' : '#eee' }]}>
        <Text style={[styles.subtotal, { color: isDarkMode ? '#fff' : '#000' }]}>{t('subtotal')}: ${subtotal.toFixed(2)}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.purchaseButton, { opacity: cartItems.length === 0 ? 0.5 : 1 }]}
            onPress={handlePurchase}
            disabled={cartItems.length === 0}
          >
            <Text style={styles.purchaseButtonText}>{t('buyNow')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.clearButton, { opacity: cartItems.length === 0 ? 0.5 : 1 }]}
            onPress={handleClearCart}
            disabled={cartItems.length === 0}
          >
            <Text style={styles.clearButtonText}>{t('emptyCart')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de confirmación de compra */}
      <Modal visible={showConfirmPurchase} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#003366' }]}>
              {t('confirmPurchase')}
            </Text>
            <Text style={[styles.modalText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              {t('totalToPay')}: ${subtotal.toFixed(2)}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#999' }]}
                onPress={() => setShowConfirmPurchase(false)}
              >
                <Text style={styles.modalButtonText}>{t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#007bff' }]}
                onPress={confirmPurchase}
              >
                <Text style={styles.modalButtonText}>{t('buy')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de confirmación de vaciar carrito */}
      <Modal visible={showConfirmClear} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#003366' }]}>
              {t('areYouSure')}
            </Text>
            <Text style={[styles.modalText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              {t('removeAllProducts')}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#999' }]}
                onPress={() => setShowConfirmClear(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ff4757' }]}
                onPress={confirmClear}
              >
                <Text style={styles.modalButtonText}>{t('yes')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de éxito */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#003366', fontSize: 24 }]}>
              {t('thanksForPurchase')}
            </Text>
            <Text style={[styles.modalText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              {t('orderProcessed')}
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#28a745', width: '100%', marginTop: 10 }]}
              onPress={() => setShowSuccess(false)}
            >
              <Text style={styles.modalButtonText}>{t('accept')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
  item: { flexDirection: 'row', marginBottom: 12, backgroundColor: '#fff', padding: 8, borderRadius: 8, elevation: 1 },
  image: { width: 64, height: 64, borderRadius: 6, marginRight: 8 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '500' },
  price: { color: '#333', marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: { width: 30, height: 30, borderRadius: 4, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  qtyText: { fontSize: 18 },
  qty: { marginHorizontal: 8 },
  remove: { marginLeft: 12 },
  footer: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10, marginTop: 8 },
  subtotal: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  buttonContainer: { flexDirection: 'column', gap: 10 },
  purchaseButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#ff4757',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});