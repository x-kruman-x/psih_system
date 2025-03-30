import getImgName from "../../utils/getImgName";
import { Typography } from "../../UI/Typography";
import logo from '../../../assets/img/logo.svg'

type FileCardProps = {
  isImg: boolean;
  url: string;
};

export function FileCard({ isImg, url }: FileCardProps) {
  return (
    <div className="flex flex-col gap-[3px] w-[95px]">
        <div className="w-[95px] h-[95px] border border-black border-solid rounded-md">
            {isImg ? <img src={url} alt="img" /> : <img className="w-full h-full" src={logo} alt="img" />}
        </div>
        <Typography className="text-ellipsis">{getImgName(url)}</Typography>
    </div>
    
  );
}
