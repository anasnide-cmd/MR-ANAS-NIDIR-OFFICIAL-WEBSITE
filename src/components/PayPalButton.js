'use client';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalButton({ amount, onSuccess }) {
    const initialOptions = {
        "client-id": "AXGCBOyxGyAb3dp_58S0_0Wv9OyLjRY4VLB9k55pEWO5hqA8cHhG8v_A0dW_EtR0oXsTXULcs14VDObs", // Replace with your actual sandbox/production client ID
        currency: "USD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <div style={{ maxWidth: "750px", minHeight: "200px" }}>
                <PayPalButtons
                    style={{ layout: "vertical", shape: "rect", label: "paypal" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: amount,
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const order = await actions.order.capture();
                        console.log("PayPal Success:", order);
                        if (onSuccess) onSuccess(order);
                    }}
                    onError={(err) => {
                        console.error("PayPal Error:", err);
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
}
