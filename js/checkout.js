import CONFIG from './config.js';
import { getCart, clearCart } from './cart.js';

export function getCartSummary(couponDiscount = 0) {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = Math.max(0, subtotal - couponDiscount);
    return { cart, subtotal, total };
}

export function generateWhatsAppMessage(customer, orderNumber, summary) {
    let msg = `*NEW ORDER - ${CONFIG.bakeryName}*\n`;
    msg += `*Order Number:* #${orderNumber}\n`;
    msg += `-----------------------------\n`;
    msg += `*Customer Details:*\n`;
    msg += `Name: ${customer.name}\n`;
    msg += `Phone: ${customer.phone}\n`;
    msg += `Email: ${customer.email || 'N/A'}\n`;
    msg += `Address: ${customer.address}\n`;
    msg += `Preferred Delivery Date: ${customer.deliveryDate}\n`;
    if (customer.notes) {
        msg += `Instructions: ${customer.notes}\n`;
    }
    msg += `-----------------------------\n`;
    msg += `*Products Ordered:*\n`;
    summary.cart.forEach(item => {
        msg += `- ${item.name} x ${item.quantity} (₹${item.price} each)\n`;
    });
    msg += `-----------------------------\n`;
    msg += `*Subtotal:* ₹${summary.subtotal}\n`;
    if (customer.discount > 0) {
        msg += `*Discount:* -₹${customer.discount} (${customer.couponCode})\n`;
    }
    msg += `*Total Amount:* ₹${summary.total}\n`;
    msg += `*Payment Method:* ${customer.paymentMethod}\n`;
    msg += `-----------------------------\n`;
    msg += `Thank you for choosing ${CONFIG.bakeryName}! Please confirm receipt and share payment status.`;
    
    return encodeURIComponent(msg);
}

export function triggerWhatsAppRedirect(customer, orderNumber, summary) {
    const message = generateWhatsAppMessage(customer, orderNumber, summary);
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
}
