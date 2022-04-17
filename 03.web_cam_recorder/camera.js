// dom
const recordButton = document.querySelector(".record-button")
const stopButton = document.querySelector(".stop-button")
const playButton = document.querySelector(".play-button")
const downloadButton = document.querySelector(".download-button")
const previewPlayer = document.querySelector("#preview")
const recordingPlayer = document.querySelector("#recording")

let recorder;
let recordedChunks ;

//functions
function videoStart(){
    // console.log(navigator);\
    // video, audio 설정 true, false 설정
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        // .then(stream => console.log(stream))
        //  web cam 미리보기에 play 
        // .then(stream => previewPlayer.srcObject = stream)
        .then(stream =>{
            previewPlayer.srcObject = stream;
            // recording functions 처리
            // console.log(previewPlayer);
            startRecording(previewPlayer.captureStream());
        })
}

function startRecording(stream){
    recordedChunks = [];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => { recordedChunks.push(e.data) }
    recorder.start()
}

function  stopRecording(){
    // console.log(previewPlayer.srcObject);
    // console.log(previewPlayer.srcObject.getTracks());
    previewPlayer.srcObject.getTracks().forEach(track => track.stop());
    recorder.stop()
    console.log(recordedChunks);
}

// blob-Web
//JavaScript에서 Blob(Binary Large Object, 블랍)은 이미지, 사운드, 
//비디오와 같은 멀티미디어 데이터를 다룰 때 사용할 수 있습니다.
//대개 데이터의 크기(Byte) 및 MIME 타입을 알아내거나, 
//데이터를 송수신을 위한 작은 Blob 객체로 나누는 등의 작업에 사용합니다.
function playRecording(){
    const recordedBlob = new Blob(recordedChunks, { type: "video/webm"});
    recordingPlayer.src = URL.createObjectURL(recordedBlob);
    recordingPlayer.play();
    downloadButton.href = recordingPlayer.src;
    downloadButton.download = `recording_${new Date()}.webm`;
    console.log(recordingPlayer.src);
}

// navigator 있는 mediaDevices 사용
// Navigator.mediaDevices읽기 전용 속성은 카메라 및
// 마이크와 같은 연결된 미디어 입력 장치와 화면 공유에 
// 대한 액세스를 제공하는 개체를 반환 합니다
//
// event
// recordButton.addEventListener("click",()=>{})
recordButton.addEventListener("click",videoStart)
stopButton.addEventListener("click",stopRecording)
playButton.addEventListener("click",playRecording)
