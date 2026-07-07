import React from 'react';
import ComingSoon from '../components/ComingSoon';

const Store: React.FC = () => {
  return (
    <ComingSoon
      title="The Porch & Paw Store"
      description="We are building an embedded shopping experience directly inside the app! Soon, you'll be able to browse our latest liquidation finds, overstock inventory, and custom gear without ever leaving your dashboard."
      features={[
        "Live product collections synchronized directly with our inventory backend",
        "Secure in-app shopping cart and seamless integrated checkout layer",
        "Exclusive early access to liquidation drops and mystery boxes"
      ]}
      externalLink={{
        label: "Shop Our Live Storefront Now",
        url: "https://porchlightfinds.com" // You can swap this with your exact Shopify URL if needed!
      }}
    />
  );
};

export default Store;
