import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
// import QRCode from 'qrcode.react'; // npm install qrcode.react 후 주석 해제

export default function Login({ onLoginSuccess }) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [qrToken, setQrToken] = useState('');

  // QR 토큰 생성 및 폴링
  useEffect(() => {
    const generateQRToken = () => {
      const token = Math.random().toString(36).substring(2, 15);
      setQrToken(token);
      
      // QR 로그인 폴링 (실제 서버 구현 후 사용)
      // const checkQRLogin = setInterval(async () => {
      //   try {
      //     const response = await fetch(`/api/qr-login/${token}`);
      //     if (response.ok) {
      //       const data = await response.json();
      //       if (data.success) {
      //         clearInterval(checkQRLogin);
      //         onLoginSuccess(data.user);
      //       }
      //     }
      //   } catch (error) {
      //     console.error('QR 로그인 확인 오류:', error);
      //   }
      // }, 2000);
      
      // return () => clearInterval(checkQRLogin);
    };

    generateQRToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.loginWithName(name.trim());
      console.log('로그인 완료, 상태 업데이트');
      onLoginSuccess();
    } catch (err) {
      console.error('로그인 오류:', err);
      setError(err.message || '로그인 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '20px',
      borderRadius: '8px',
      width: '250px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      zIndex: 1000
    }}>
      <h3 style={{ 
        textAlign: 'center', 
        marginBottom: '15px',
        color: '#333',
        fontSize: '16px'
      }}>
        게임 입장
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="text"
            placeholder="닉네임을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>

        {error && (
          <div style={{
            color: 'red',
            fontSize: '11px',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          {isLoading ? '처리 중...' : '게임 시작'}
        </button>
        
        <div style={{
          fontSize: '10px',
          color: '#666',
          textAlign: 'center',
          marginTop: '8px'
        }}>
          닉네임을 입력하면 자동으로 계정이 생성됩니다
        </div>
      </form>

      {/* QR 코드 섹션 */}
      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        padding: '15px',
        backgroundColor: 'rgba(240, 240, 240, 0.9)',
        borderRadius: '8px',
        border: '1px dashed #ccc'
      }}>
        <div style={{
          fontSize: '12px',
          color: '#333',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          📱 QR 코드로 빠른 로그인
        </div>
        
        <div style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'white',
          border: '1px solid #ddd',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          color: '#666'
        }}>
          {/* QR 코드 자리 - npm install qrcode.react 후 사용 */}
          {/* <QRCode 
            value={`${window.location.origin}/qr-login/${qrToken}`}
            size={90}
          /> */}
          QR 코드
          <br />
          (구현 예정)
        </div>
        
        <div style={{
          fontSize: '9px',
          color: '#666',
          marginTop: '8px'
        }}>
          모바일로 QR 스캔하여 자동 로그인
        </div>
      </div>
    </div>
  );
}