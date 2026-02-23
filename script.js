// job data array
var jobsData = [
    {
        id: 1,
        companyName: "Mobile First Corp",
        position: "React Native Developer",
        location: "Remote",
        type: "Full-time",
        salary: "$130,000 - $175,000",
        description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
        status: "none"
    },
    {
        id: 2,
        companyName: "WebFlow Agency",
        position: "Web Designer & Developer",
        location: "Los Angeles, CA",
        type: "Part-time",
        salary: "$80,000 - $120,000",
        description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
        status: "none"
    },
    {
        id: 3,
        companyName: "DataViz Solutions",
        position: "Data Visualization Specialist",
        location: "Boston, MA",
        type: "Full-time",
        salary: "$125,000 - $165,000",
        description: "Design and develop interactive data dashboards. Help clients understand complex data through beautiful visual storytelling.",
        status: "none"
    },
    {
        id: 4,
        companyName: "CloudSync Technologies",
        position: "Backend Developer",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$105,000 - $145,000",
        description: "Develop scalable cloud-based APIs and microservices. Work with Node.js and AWS to power high-traffic applications.",
        status: "none"
    },
    {
        id: 5,
        companyName: "PixelCraft Studio",
        position: "UI/UX Designer",
        location: "Remote",
        type: "Contract",
        salary: "$75,000 - $95,000",
        description: "Design modern and user-friendly interfaces for web and mobile apps. Conduct user research and create wireframes and prototypes.",
        status: "none"
    },
    {
        id: 6,
        companyName: "SecureNet Inc",
        position: "Cybersecurity Analyst",
        location: "Washington, DC",
        type: "Full-time",
        salary: "$115,000 - $155,000",
        description: "Monitor and protect company infrastructure from security threats. Perform vulnerability assessments and incident response.",
        status: "none"
    },
    {
        id: 7,
        companyName: "GreenTech Startup",
        position: "Full Stack Engineer",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120,000 - $160,000",
        description: "Build and maintain a sustainable energy tracking platform. Work closely with product and design teams in an agile environment.",
        status: "none"
    },
    {
        id: 8,
        companyName: "EduLearn Platform",
        position: "Frontend Developer",
        location: "Remote",
        type: "Part-time",
        salary: "$60,000 - $85,000",
        description: "Develop interactive learning modules for an online education platform. Experience with React and accessibility standards is required.",
        status: "none"
    }
];

// keep track of which tab is open
var currentTab = "all";

// this function creates one job card HTML element
function createJobCard(job) {
    var card = document.createElement("div");
    card.className = "job-card";
    card.setAttribute("data-id", job.id);

    // figure out what status badge to show
    var badgeText = "NOT APPLIED";
    var badgeClass = "";

    if (job.status === "interview") {
        badgeText = "INTERVIEW";
        badgeClass = "interview-badge";
    } else if (job.status === "rejected") {
        badgeText = "REJECTED";
        badgeClass = "rejected-badge";
    }

    // check if buttons should be highlighted
    var interviewActiveClass = "";
    var rejectedActiveClass = "";

    if (job.status === "interview") {
        interviewActiveClass = "btn-active";
    }
    if (job.status === "rejected") {
        rejectedActiveClass = "btn-active";
    }

    card.innerHTML = `
        <button class="btn-delete" onclick="deleteJob(${job.id})">🗑</button>
        <p class="company-name">${job.companyName}</p>
        <p class="job-position">${job.position}</p>
        <div class="job-meta">
            <span>${job.location}</span>
            <span class="meta-dot">•</span>
            <span>${job.type}</span>
            <span class="meta-dot">•</span>
            <span>${job.salary}</span>
        </div>
        <span class="status-badge ${badgeClass}">${badgeText}</span>
        <p class="job-description">${job.description}</p>
        <div class="card-buttons">
            <button class="btn-interview ${interviewActiveClass}" onclick="clickInterview(${job.id})">INTERVIEW</button>
            <button class="btn-rejected ${rejectedActiveClass}" onclick="clickRejected(${job.id})">REJECTED</button>
        </div>
    `;

    return card;
}

// interview button click handler
function clickInterview(id) {
    var job = getJobById(id);

    // toggle: if already interview, set back to none
    if (job.status === "interview") {
        job.status = "none";
    } else {
        job.status = "interview";
    }

    // re-render everything
    renderAllTabs();
    updateDashboardNumbers();
    updateJobsCountLabel();
}

// rejected button click handler
function clickRejected(id) {
    var job = getJobById(id);

    // toggle: if already rejected, set back to none
    if (job.status === "rejected") {
        job.status = "none";
    } else {
        job.status = "rejected";
    }

    renderAllTabs();
    updateDashboardNumbers();
    updateJobsCountLabel();
}

// delete button click handler
function deleteJob(id) {
    // find position in array
    var foundIndex = -1;
    for (var i = 0; i < jobsData.length; i++) {
        if (jobsData[i].id === id) {
            foundIndex = i;
            break;
        }
    }

    // remove from array if found
    if (foundIndex !== -1) {
        jobsData.splice(foundIndex, 1);
    }

    renderAllTabs();
    updateDashboardNumbers();
    updateJobsCountLabel();
}

// helper to find job by id
function getJobById(id) {
    for (var i = 0; i < jobsData.length; i++) {
        if (jobsData[i].id === id) {
            return jobsData[i];
        }
    }
    return null;
}

// render all 3 tabs
function renderAllTabs() {
    renderTab("all");
    renderTab("interview");
    renderTab("rejected");
}

// render a specific tab
function renderTab(tabName) {
    var listEl;
    var emptyEl;
    var filteredJobs = [];

    if (tabName === "all") {
        listEl = document.getElementById("all-jobs-list");
        emptyEl = document.getElementById("all-empty");
        filteredJobs = jobsData; // show all jobs
    } else if (tabName === "interview") {
        listEl = document.getElementById("interview-jobs-list");
        emptyEl = document.getElementById("interview-empty");
        // filter only interview jobs
        for (var i = 0; i < jobsData.length; i++) {
            if (jobsData[i].status === "interview") {
                filteredJobs.push(jobsData[i]);
            }
        }
    } else if (tabName === "rejected") {
        listEl = document.getElementById("rejected-jobs-list");
        emptyEl = document.getElementById("rejected-empty");
        // filter only rejected jobs
        for (var i = 0; i < jobsData.length; i++) {
            if (jobsData[i].status === "rejected") {
                filteredJobs.push(jobsData[i]);
            }
        }
    }

    // clear the list
    listEl.innerHTML = "";

    if (filteredJobs.length === 0) {
        // show empty state
        emptyEl.style.display = "block";
    } else {
        // hide empty state and add cards
        emptyEl.style.display = "none";
        for (var i = 0; i < filteredJobs.length; i++) {
            var card = createJobCard(filteredJobs[i]);
            listEl.appendChild(card);
        }
    }
}

// update the 3 dashboard number cards
function updateDashboardNumbers() {
    var interviewCount = 0;
    var rejectedCount = 0;

    for (var i = 0; i < jobsData.length; i++) {
        if (jobsData[i].status === "interview") {
            interviewCount++;
        } else if (jobsData[i].status === "rejected") {
            rejectedCount++;
        }
    }

    document.getElementById("total-count").innerText = jobsData.length;
    document.getElementById("interview-count").innerText = interviewCount;
    document.getElementById("rejected-count").innerText = rejectedCount;
}

// update the "X jobs" text on the right side of section title
function updateJobsCountLabel() {
    var count = 0;

    if (currentTab === "all") {
        count = jobsData.length;
    } else if (currentTab === "interview") {
        for (var i = 0; i < jobsData.length; i++) {
            if (jobsData[i].status === "interview") {
                count++;
            }
        }
    } else if (currentTab === "rejected") {
        for (var i = 0; i < jobsData.length; i++) {
            if (jobsData[i].status === "rejected") {
                count++;
            }
        }
    }

    document.getElementById("jobs-count-label").innerText = count + " jobs";
}

// tab switching function
function showTab(tabName) {
    currentTab = tabName;

    // hide all tab contents
    var allTabContents = document.querySelectorAll(".tab-content");
    for (var i = 0; i < allTabContents.length; i++) {
        allTabContents[i].classList.remove("active");
    }

    // remove active class from all tab buttons
    var allTabButtons = document.querySelectorAll(".tab-btn");
    for (var i = 0; i < allTabButtons.length; i++) {
        allTabButtons[i].classList.remove("active");
    }

    // show the selected tab content
    document.getElementById("tab-" + tabName).classList.add("active");

    // set the clicked button as active
    document.getElementById("tab-btn-" + tabName).classList.add("active");

    // update the count label for current tab
    updateJobsCountLabel();
}

// initialize the page
renderAllTabs();
updateDashboardNumbers();
updateJobsCountLabel();
