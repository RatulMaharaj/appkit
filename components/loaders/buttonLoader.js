import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

export default function ButtonLoader({ loading, size = 5, color = `#ffffff` }) {
  return <SyncLoader color={color} loading={loading} size={size} margin={2} />;
}
