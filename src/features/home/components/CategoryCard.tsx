import './CategoryCard.scss';

interface CategoryCardProps {
  name: string;
  icon: string;
  onClick: () => void;
}

const CategoryCard = ({ name, icon, onClick }: CategoryCardProps) => {
  return (
    <div className="category-card" onClick={onClick}>
      <div className="icon-wrapper">
        <i className="material-icons">{icon}</i>
      </div>
      <h3>{name}</h3>
    </div>
  );
};

export default CategoryCard; 