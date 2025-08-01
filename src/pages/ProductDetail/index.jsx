import { useParams } from "react-router-dom";
import './productDetail.module.css'

export default function ProductDetail() {
  const params = useParams();
  return (
    <div>
      <h1>产品详情页</h1>
      <p>产品ID: {params.id}</p>
    </div>
  );
}
