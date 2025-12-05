import React from 'react';

const AIInsights = ({ analysisData }) => {
  if (!analysisData) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>💡 AI Insights</h3>
        <div style={styles.emptyState}>
          <p>Loading AI insights...</p>
        </div>
      </div>
    );
  }

  const { insights, recommendations, trends } = analysisData;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>💡 AI Insights</h3>
      
      {insights && insights.length > 0 && (
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Spending Insights</h4>
          <ul style={styles.list}>
            {insights.map((insight, index) => (
              <li key={index} style={styles.listItem}>{insight}</li>
            ))}
          </ul>
        </div>
      )}

      {recommendations && recommendations.length > 0 && (
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Recommendations</h4>
          <ul style={styles.list}>
            {recommendations.map((rec, index) => (
              <li key={index} style={styles.listItem}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {trends && (
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Spending Trends</h4>
          <div style={styles.trendsGrid}>
            {trends.increasing && trends.increasing.length > 0 && (
              <div style={styles.trendBox}>
                <div style={{...styles.trendLabel, color: '#f44336'}}>📈 Increasing</div>
                <div style={styles.trendItems}>
                  {trends.increasing.map((cat, index) => (
                    <span key={index} style={{...styles.badge, backgroundColor: '#ffebee', color: '#c62828'}}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {trends.decreasing && trends.decreasing.length > 0 && (
              <div style={styles.trendBox}>
                <div style={{...styles.trendLabel, color: '#4caf50'}}>📉 Decreasing</div>
                <div style={styles.trendItems}>
                  {trends.decreasing.map((cat, index) => (
                    <span key={index} style={{...styles.badge, backgroundColor: '#e8f5e9', color: '#2e7d32'}}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {trends.stable && trends.stable.length > 0 && (
              <div style={styles.trendBox}>
                <div style={{...styles.trendLabel, color: '#2196f3'}}>➡️ Stable</div>
                <div style={styles.trendItems}>
                  {trends.stable.map((cat, index) => (
                    <span key={index} style={{...styles.badge, backgroundColor: '#e3f2fd', color: '#1565c0'}}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  title: {
    marginTop: 0,
    marginBottom: '20px',
    color: '#333'
  },
  section: {
    marginBottom: '20px'
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: '10px',
    color: '#555',
    fontSize: '16px'
  },
  list: {
    margin: 0,
    paddingLeft: '20px',
    color: '#666'
  },
  listItem: {
    marginBottom: '8px',
    lineHeight: '1.6'
  },
  trendsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  trendBox: {
    padding: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    backgroundColor: '#fafafa'
  },
  trendLabel: {
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '14px'
  },
  trendItems: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  emptyState: {
    padding: '20px',
    textAlign: 'center',
    color: '#888'
  }
};

export default AIInsights;
