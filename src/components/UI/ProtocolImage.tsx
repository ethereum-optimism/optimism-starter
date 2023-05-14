import AAVE from "../../assets/protocols/AAVe.svg";
import UNISWAP from "../../assets/protocols/Uniswap.svg";

interface TokenImages {
  [key: string]: string;
}

const tokenImages: TokenImages = {
  1: UNISWAP,
  2: AAVE,
};

export interface ProtocolImageProps {
  protocolId: number;
  height?: number;
  width?: number;
}

const ProtocolImage = (props: ProtocolImageProps) => {
  return (
    <div className="flex">
      <img
        className={`h-[${props.height}px]`}
        alt={tokenImages[props.protocolId]}
        src={tokenImages[props.protocolId]}
        style={{
          height: `${props.height}px}`,
          width: `${props.width}px`,
        }}
      />
    </div>
  );
};

export default ProtocolImage;
