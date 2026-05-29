// YouTube API를 활용한 실시간 데이터 연동
const YOUTUBE_API_KEY = '당신의_유튜브_API_키를_발급받아_넣으세요';
const VIDEO_ID = 'YOUR_VIDEO_ID'; // 유튜브 URL의 v= 뒷부분

async function fetchYouTubeStats() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${VIDEO_ID}&key=${YOUTUBE_API_KEY}`);
        const data = await response.json();
        
        if(data.items && data.items.length > 0) {
            const stats = data.items[0].statistics;
            // 숫자에 콤마 찍기 (예: 1,200)
            const views = Number(stats.viewCount).toLocaleString();
            const likes = Number(stats.likeCount).toLocaleString();
            
            const statsContainer = document.getElementById('yt-stats-1');
            statsContainer.querySelector('.views').innerText = views;
            statsContainer.querySelector('.likes').innerText = likes;
        }
    } catch (error) {
        console.error('YouTube 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', fetchYouTubeStats);