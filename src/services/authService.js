const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const authService = {
  // 간소화된 로그인/회원가입 (이름만으로)
  async loginWithName(name) {
    const email = `${name}@game.com`;
    const password = `${name}123!`;
    
    console.log('로그인 시도:', { email, password });
    
    try {
      // 먼저 로그인 시도
      const loginResponse = await fetch(`${API_BASE_URL}/member/doLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      
      console.log('로그인 응답 상태:', loginResponse.status);
      
      if (loginResponse.ok) {
        const data = await loginResponse.json();
        console.log('로그인 성공:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('memberId', data.id);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        
        // 메인 채팅방 생성/참여
        try {
          // 먼저 기존 채팅방 목록 확인
          const roomListResponse = await fetch(`${API_BASE_URL}/chat/room/group/list`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${data.token}`
            }
          });
          
          let roomId = 1;
          if (roomListResponse.ok) {
            const rooms = await roomListResponse.json();
            console.log('기존 채팅방 목록:', rooms);
            
            if (rooms.length > 0) {
              roomId = rooms[0].roomId;
              console.log('기존 채팅방 사용:', roomId);
            } else {
              // 채팅방이 없으면 생성
              await fetch(`${API_BASE_URL}/chat/room/group/create?roomName=메인채팅방`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${data.token}`
                }
              });
              console.log('메인 채팅방 생성 완료');
            }
          }
          
          // 채팅방에 자동 참여
          try {
            const joinResponse = await fetch(`${API_BASE_URL}/chat/room/group/${roomId}/join`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`
              }
            });
            
            if (joinResponse.ok) {
              console.log('채팅방 참여 완료');
            } else {
              console.log('채팅방 참여 응답:', joinResponse.status);
            }
          } catch (error) {
            console.log('채팅방 참여 오류:', error);
          }
          
        } catch (error) {
          console.log('채팅방 처리 오류:', error);
        }
        
        return data;
      }
      
      // 로그인 실패시 회원가입 시도
      console.log('로그인 실패, 회원가입 시도');
      const registerResponse = await fetch(`${API_BASE_URL}/member/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });
      
      console.log('회원가입 응답 상태:', registerResponse.status);
      
      if (!registerResponse.ok) {
        const errorText = await registerResponse.text();
        console.error('회원가입 실패:', errorText);
        throw new Error(`회원가입 실패: ${errorText}`);
      }
      
      // 회원가입 성공후 자동 로그인
      console.log('회원가입 성공, 자동 로그인 시도');
      const loginRetryResponse = await fetch(`${API_BASE_URL}/member/doLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      
      console.log('자동 로그인 응답 상태:', loginRetryResponse.status);
      
      if (!loginRetryResponse.ok) {
        const errorText = await loginRetryResponse.text();
        console.error('자동 로그인 실패:', errorText);
        throw new Error(`자동 로그인 실패: ${errorText}`);
      }
      
      const data = await loginRetryResponse.json();
      console.log('자동 로그인 성공:', data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('memberId', data.id);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name);
      
      // 메인 채팅방 생성/참여
      try {
        // 먼저 기존 채팅방 목록 확인
        const roomListResponse = await fetch(`${API_BASE_URL}/chat/room/group/list`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.token}`
          }
        });
        
        let roomId = 1;
        if (roomListResponse.ok) {
          const rooms = await roomListResponse.json();
          console.log('기존 채팅방 목록:', rooms);
          
          if (rooms.length > 0) {
            roomId = rooms[0].roomId;
            console.log('기존 채팅방 사용:', roomId);
          } else {
            // 채팅방이 없으면 생성
            await fetch(`${API_BASE_URL}/chat/room/group/create?roomName=메인채팅방`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`
              }
            });
            console.log('메인 채팅방 생성 완료');
          }
        }
        
        // 채팅방에 자동 참여
        try {
          const joinResponse = await fetch(`${API_BASE_URL}/chat/room/group/${roomId}/join`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.token}`
            }
          });
          
          if (joinResponse.ok) {
            console.log('채팅방 참여 완료');
          } else {
            console.log('채팅방 참여 응답:', joinResponse.status);
          }
        } catch (error) {
          console.log('채팅방 참여 오류:', error);
        }
        
      } catch (error) {
        console.log('채팅방 처리 오류:', error);
      }
      
      return data;
      
    } catch (error) {
      console.error('전체 오류:', error);
      throw new Error(error.message || '로그인/회원가입 처리 중 오류가 발생했습니다.');
    }
  },

  // 로그아웃
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('memberId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    // 강제 새로고침으로 완전 초기화
    window.location.reload();
  },

  // 강제 로그아웃 (모든 localStorage 삭제)
  forceLogout() {
    localStorage.clear();
    window.location.reload();
  },

  // 사용자 이름 조회
  getUserName() {
    return localStorage.getItem('userName');
  },

  // 토큰 조회
  getToken() {
    return localStorage.getItem('token');
  },

  // 사용자 이메일 조회
  getUserEmail() {
    return localStorage.getItem('userEmail');
  },

  // 로그인 상태 확인
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
};