// Telecom Quiz Questions Database
const telecomQuestions = [
  {
    q: "What does 5G stand for?",
    choices: ["5th Generation", "5 Gigabytes", "5 Groups", "5 Gateway"],
    answer: 0
  },
  {
    q: "Which frequency band is commonly used for 4G LTE?",
    choices: ["900 MHz", "1800 MHz", "2100 MHz", "All of the above"],
    answer: 3
  },
  {
    q: "What is the maximum theoretical speed of 5G?",
    choices: ["1 Gbps", "10 Gbps", "20 Gbps", "100 Gbps"],
    answer: 2
  },
  {
    q: "What does VoLTE stand for?",
    choices: ["Voice over LTE", "Video over LTE", "Virtual over LTE", "Voice over Line"],
    answer: 0
  },
  {
    q: "Which technology is used for fiber optic communication?",
    choices: ["Radio waves", "Light signals", "Electrical signals", "Sound waves"],
    answer: 1
  },
  {
    q: "What is the purpose of a Base Station Controller (BSC)?",
    choices: ["Control radio resources", "Manage billing", "Store user data", "Route calls"],
    answer: 0
  },
  {
    q: "In GSM, what does IMEI stand for?",
    choices: ["International Mobile Equipment Identity", "Internal Mobile Equipment ID", "International Mobile Electronic Identity", "Internal Mobile Electronic ID"],
    answer: 0
  },
  {
    q: "What is the standard for WiFi 6?",
    choices: ["802.11ac", "802.11ax", "802.11n", "802.11g"],
    answer: 1
  },
  {
    q: "Which protocol is used for internet communication?",
    choices: ["HTTP", "TCP/IP", "FTP", "SMTP"],
    answer: 1
  },
  {
    q: "What does IoT stand for?",
    choices: ["Internet of Things", "Internet over Technology", "Internal of Technology", "Internet on Technology"],
    answer: 0
  },
  {
    q: "What is the main advantage of fiber optic cables over copper cables?",
    choices: ["Lower cost", "Higher bandwidth", "Easier installation", "Better durability"],
    answer: 1
  },
  {
    q: "In mobile networks, what does MIMO stand for?",
    choices: ["Multiple Input Multiple Output", "Mobile Input Mobile Output", "Multi Input Multi Output", "Mobile Internet Mobile Output"],
    answer: 0
  },
  {
    q: "What is the typical latency target for 5G networks?",
    choices: ["100ms", "50ms", "10ms", "1ms"],
    answer: 3
  },
  {
    q: "Which generation of mobile technology introduced data services?",
    choices: ["1G", "2G", "3G", "4G"],
    answer: 1
  },
  {
    q: "What does NFV stand for in telecommunications?",
    choices: ["Network Function Virtualization", "New Function Virtualization", "Network Function Verification", "New Function Verification"],
    answer: 0
  },
  {
    q: "What is the primary purpose of a firewall?",
    choices: ["Increase speed", "Network security", "Data storage", "Signal amplification"],
    answer: 1
  },
  {
    q: "In satellite communication, what does GEO stand for?",
    choices: ["Global Earth Orbit", "Geostationary Earth Orbit", "General Earth Orbit", "Geographic Earth Orbit"],
    answer: 1
  },
  {
    q: "What is the frequency range of the C-band used in satellites?",
    choices: ["1-2 GHz", "4-8 GHz", "10-12 GHz", "14-18 GHz"],
    answer: 1
  },
  {
    q: "Which technology enables network slicing in 5G?",
    choices: ["SDN", "NFV", "Both SDN and NFV", "Cloud computing"],
    answer: 2
  },
  {
    q: "What does QoS stand for in networking?",
    choices: ["Quality of Service", "Quantity of Service", "Quick of Service", "Query of Service"],
    answer: 0
  },
  {
    q: "In optical fiber, what causes signal loss?",
    choices: ["Attenuation", "Amplification", "Modulation", "Demodulation"],
    answer: 0
  },
  {
    q: "What is the main function of a router?",
    choices: ["Amplify signals", "Route data packets", "Store data", "Convert signals"],
    answer: 1
  },
  {
    q: "What does OFDM stand for?",
    choices: ["Orthogonal Frequency Division Multiplexing", "Optical Frequency Division Multiplexing", "Orthogonal Function Division Multiplexing", "Optical Function Division Multiplexing"],
    answer: 0
  },
  {
    q: "Which layer of the OSI model handles routing?",
    choices: ["Physical", "Data Link", "Network", "Transport"],
    answer: 2
  },
  {
    q: "What is the purpose of error correction codes?",
    choices: ["Increase speed", "Detect and correct errors", "Compress data", "Encrypt data"],
    answer: 1
  },
  {
    q: "In wireless communication, what does CSMA/CD stand for?",
    choices: ["Carrier Sense Multiple Access/Collision Detection", "Circuit Switch Multiple Access/Collision Detection", "Carrier Sense Multiple Access/Connection Detection", "Circuit Sense Multiple Access/Connection Detection"],
    answer: 0
  },
  {
    q: "What is the typical range of Bluetooth Low Energy (BLE)?",
    choices: ["1-10 meters", "10-50 meters", "50-100 meters", "100-200 meters"],
    answer: 1
  },
  {
    q: "Which modulation technique is commonly used in digital communication?",
    choices: ["AM", "FM", "QAM", "PM"],
    answer: 2
  },
  {
    q: "What does MPLS stand for in networking?",
    choices: ["Multi-Protocol Label Switching", "Multiple Protocol Label Switching", "Multi-Path Label Switching", "Multiple Path Label Switching"],
    answer: 0
  },
  {
    q: "In mobile networks, what is the function of the Home Location Register (HLR)?",
    choices: ["Store subscriber information", "Route calls", "Manage billing", "Control base stations"],
    answer: 0
  }
];

// Function to get random questions
function getRandomQuestions(count = 20) {
  const shuffled = [...telecomQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}