import React from 'react';
import Layout from '@theme/Layout';

export default function ReachMe() {
  return (
    <Layout>
      <div style={{ 
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1>How to Reach Me</h1>
        
        <section style={{ marginTop: '2rem' }}>
          
          <div style={{ marginTop: '1.5rem' }}>
            <h3>📧 Email</h3>
            <p>
              <span>kannzuitei@gmail.com</span>
            </p>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <h3>💬 Line</h3>
            <p>
              <a href="https://line.me/ti/p/6UweaTx_tC" target="_blank" rel="noopener noreferrer">
                https://line.me/ti/p/6UweaTx_tC
              </a>
            </p>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <h3>💬 WeChat</h3>
            <p>Account: furiflow<br/>
            Username:  大姐姐小姐姐</p>
            <img 
              src="/img/default/wechat.jpg" 
              alt="WeChat QR Code" 
              style={{ width: '250px', marginTop: '1rem', border: '1px solid #ddd', borderRadius: '8px' }} 
            />
          </div>
        </section>
      </div>
    </Layout>
  );
}