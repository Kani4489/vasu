export async function loadPromotions() {
    try {
        const response = await fetch('data/promotions.json');
        return await response.json();
    } catch (e) {
        console.error('Failed to load promotions:', e);
        return { coupons: [], comboOffers: [], limitedOffers: [] };
    }
}

export function validateCoupon(code, subtotal, promotions) {
    const coupon = promotions.coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);
    if (!coupon) {
        return { valid: false, message: "Invalid coupon code" };
    }
    
    // Check expiry
    if (new Date(coupon.validUntil) < new Date()) {
        return { valid: false, message: "Coupon has expired" };
    }
    
    // Check minimum order
    if (subtotal < coupon.minOrder) {
        return { valid: false, message: `Minimum order value of ₹${coupon.minOrder} required` };
    }
    
    let discount = 0;
    if (coupon.type === 'percentage') {
        discount = (subtotal * coupon.value) / 100;
        if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
        }
    } else if (coupon.type === 'flat') {
        discount = coupon.value;
    }
    
    return {
        valid: true,
        coupon: coupon,
        discount: discount,
        message: `Coupon Applied! Saved ₹${discount}`
    };
}
