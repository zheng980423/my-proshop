import React from 'react';
import { Helmet } from 'react-helmet';
const Meta = ({ title, descrption, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={descrption} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: 'Proshop | 你想要的商品，这里都有',
  descrption: '价格实惠，快送方便',
  keywords: '苹果手机,食品,电子商城,便宜苹果手机,苹果手机优惠券',
};
export default Meta;
