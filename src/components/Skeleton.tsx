interface Props {
  classNames: string;
}

export const Skeleton: React.FC<Props> = ({ classNames }) => {
  return <div className={classNames + " skeleton-animation"}></div>;
};
