import './Features.scss';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: 'local_shipping',
      title: 'Free Shipping',
      description: 'On orders over $50',
      color: '#4299e1' // blue
    },
    {
      id: 2,
      icon: 'lock',
      title: 'Secure Payment',
      description: '100% secure payment',
      color: '#48bb78' // green
    },
    {
      id: 3,
      icon: 'cached',
      title: 'Easy Returns',
      description: '30 day return policy',
      color: '#ed8936' // orange
    },
    {
      id: 4,
      icon: 'headset_mic',
      title: '24/7 Support',
      description: 'Dedicated support',
      color: '#9f7aea' // purple
    }
  ];

  return (
    <section className="features">
      <div className="features-grid">
        {features.map(feature => (
          <div key={feature.id} className="feature-card">
            <div className="icon-wrapper" style={{ backgroundColor: `${feature.color}15` }}>
              <i 
                className="material-icons"
                style={{ color: feature.color }}
              >
                {feature.icon}
              </i>
            </div>
            <div className="feature-content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features; 