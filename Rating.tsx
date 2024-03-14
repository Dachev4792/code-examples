interface Props {
  stars: number[];
  score: number;
  total: number;
}
const Rating: React.FC<Props> = (props) => {
  const { stars, score, total } = props;
  const calculateStarType = (index: number) => {
    const percentage = index / stars.length;
    const part = total / stars.length;
    const isFull = score >= percentage * total;
    const isHalfFull = score >= percentage * total - part / 2;
    if (isFull) {
      return 'FULL';
    }
    if (isHalfFull) {
      return 'HALF-FULL';
    }
    return 'EMPTY';
  };
  return (
    <div data-testid="rating-container" className={styles.container}>
      {stars.map((star) => (
        <Icon.Star
          key={star}
          type={calculateStarType(star)}
          color="#FBBF24"
          size={12}
        />
      ))}
    </div>
  );
};
export default Rating;
