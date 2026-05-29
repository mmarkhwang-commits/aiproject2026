// YouTube API를 활용한 실시간 데이터 연동
const YOUTUBE_API_KEY = '당신의_유튜브_API_키를_발급받아_넣으세요';

// 여러 비디오 ID 관리
const VIDEO_IDS = [
    { id: 'dQw4w9WgXcQ', statsBadgeId: 'yt-stats-1' },
    { id: '9bZkp7q19f0', statsBadgeId: 'yt-stats-2' },
    { id: 'jNQXAC9IVRw', statsBadgeId: 'yt-stats-3' }
];

async function fetchYouTubeStats(videoId, statsBadgeId) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`);
        const data = await response.json();
        
        if(data.items && data.items.length > 0) {
            const stats = data.items[0].statistics;
            const views = Number(stats.viewCount).toLocaleString();
            const likes = Number(stats.likeCount).toLocaleString();
            
            const statsContainer = document.getElementById(statsBadgeId);
            if(statsContainer) {
                statsContainer.querySelector('.views').innerText = views;
                statsContainer.querySelector('.likes').innerText = likes;
            }
        }
    } catch (error) {
        console.error(`비디오 ${videoId}의 통계를 불러오는 중 오류가 발생했습니다:`, error);
    }
}

// 모든 비디오에 대해 통계 가져오기
function loadAllVideoStats() {
    VIDEO_IDS.forEach(video => {
        fetchYouTubeStats(video.id, video.statsBadgeId);
    });
}

// 이미지 갤러리 모달 기능
function setupGalleryModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // 갤러리 아이템 클릭 시 모달 열기
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-src');
            modalImage.src = imageSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 스크롤 방지
        });
    });

    // 닫기 버튼 클릭
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // 스크롤 복구
    });

    // 모달 배경 클릭 시 닫기
    modal.addEventListener('click', function(e) {
        if(e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    loadAllVideoStats();
    setupGalleryModal();
});