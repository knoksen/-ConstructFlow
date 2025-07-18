// ConstructFlow Desktop Application JavaScript

// Desktop-specific initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeDesktopFeatures();
    initializeBIMViewer();
    initializeRepairManagement();
    initializeTaskManagement();
    startRealtimeUpdates();
});

// Desktop-specific features
function initializeDesktopFeatures() {
    // Update clock in status bar
    updateClock();
    setInterval(updateClock, 1000);
    
    // Desktop keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Window resize handler
    window.addEventListener('resize', handleWindowResize);
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const clockElement = document.getElementById('current-time');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + N: New Task
    if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault();
        // Focus on new task button or open new task modal
        document.querySelector('[class*="New Task"]')?.click();
    }
    
    // Ctrl/Cmd + F: Focus search/filter
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        // Focus on search input if available
        const searchInput = document.querySelector('input[placeholder*="search"], input[placeholder*="filter"]');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // F5: Refresh data
    if (event.key === 'F5') {
        event.preventDefault();
        refreshApplicationData();
    }
    
    // Escape: Close modals
    if (event.key === 'Escape') {
        closeAllModals();
    }
}

function handleWindowResize() {
    // Responsive adjustments for desktop
    const width = window.innerWidth;
    const dashboardGrid = document.querySelector('.dashboard-grid');
    
    if (width < 1200) {
        dashboardGrid?.classList.add('grid-cols-1');
        dashboardGrid?.classList.remove('lg:grid-cols-3');
    } else {
        dashboardGrid?.classList.remove('grid-cols-1');
        dashboardGrid?.classList.add('lg:grid-cols-3');
    }
}

function refreshApplicationData() {
    updateStatusBar('Refreshing data...');
    
    // Simulate data refresh
    setTimeout(() => {
        renderRepairs();
        updateBIMViewer();
        updateStatusBar('Data refreshed');
        
        // Reset status after 2 seconds
        setTimeout(() => {
            updateStatusBar('Ready');
        }, 2000);
    }, 1000);
}

function updateStatusBar(message) {
    const statusElement = document.getElementById('status-text');
    if (statusElement) {
        statusElement.textContent = message;
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('[id$="-modal"]');
    modals.forEach(modal => {
        modal.classList.add('hidden');
    });
}

// BIM Viewer Initialization
function initializeBIMViewer() {
    const container = document.getElementById('bim-viewer');
    if (!container) return;
    
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.id = 'viewer-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    // Initialize xeokit viewer if available
    if (typeof xeokit !== 'undefined') {
        try {
            const viewer = new xeokit.Viewer({
                canvasId: 'viewer-canvas'
            });

            const xktLoader = new xeokit.XKTLoaderPlugin(viewer);

            // Load IFC/BIM models converted to XKT format
            xktLoader.load({
                id: 'sample',
                src: 'models/sample.xkt',
                edges: true
            }).catch(() => {
                // If model loading fails, show placeholder
                showBIMPlaceholder();
            });
        } catch (error) {
            console.warn('xeokit initialization failed:', error);
            showBIMPlaceholder();
        }
    } else {
        showBIMPlaceholder();
    }
}

function showBIMPlaceholder() {
    const viewer = document.getElementById('bim-viewer');
    if (!viewer) return;
    
    viewer.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
                <i class="fas fa-cube text-6xl text-blue-500 mb-4 animate-pulse"></i>
                <p class="text-gray-700 font-medium">Loading 3D Model</p>
                <p class="text-gray-500 text-sm mt-1">Riverfront_Tower_L3.ifc</p>
                <div class="w-32 h-1 bg-gray-200 rounded-full mt-4 mx-auto">
                    <div class="h-1 bg-blue-500 rounded-full animate-progress" style="width: 0%"></div>
                </div>
            </div>
        </div>
    `;
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 5;
        const progressBar = document.querySelector('.animate-progress');
        if (progressBar) progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            viewer.innerHTML = `
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center">
                        <i class="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
                        <p class="text-gray-700 font-medium">Model Loaded Successfully</p>
                        <p class="text-gray-500 text-sm mt-1">3D visualization ready</p>
                        <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Explore Model
                        </button>
                    </div>
                </div>
                <div class="viewer-controls">
                    <button class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100" title="Pan">
                        <i class="fas fa-arrows-alt text-gray-700"></i>
                    </button>
                    <button class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100" title="Zoom In">
                        <i class="fas fa-search-plus text-gray-700"></i>
                    </button>
                    <button class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100" title="Zoom Out">
                        <i class="fas fa-search-minus text-gray-700"></i>
                    </button>
                    <button class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100" title="Reset View">
                        <i class="fas fa-home text-gray-700"></i>
                    </button>
                </div>
                <div class="phase-indicator">
                    <i class="fas fa-hard-hat text-blue-500 mr-1"></i>
                    <span>Structural Framing Phase</span>
                </div>
            `;
        }
    }, 100);
}

function updateBIMViewer() {
    // Simulate BIM viewer update
    updateStatusBar('Updating 3D model...');
    
    setTimeout(() => {
        updateStatusBar('3D model updated');
        setTimeout(() => updateStatusBar('Ready'), 2000);
    }, 1000);
}

// Repair Management System
let repairs = [
    {
        id: 'RPR-001',
        equipment: 'Crane A',
        type: 'Hydraulic',
        priority: 'High',
        status: 'Open',
        description: 'Hydraulic arm moving slowly, possible leak in main cylinder',
        reporter: 'Mike Johnson',
        dateReported: '2025-07-13',
        assignedTo: 'Maintenance Team',
        estimatedCost: 2800
    },
    {
        id: 'RPR-002', 
        equipment: 'Generator',
        type: 'Electrical',
        priority: 'Critical',
        status: 'In Progress',
        description: 'Backup generator not starting, electrical fault detected',
        reporter: 'Sarah Wilson',
        dateReported: '2025-07-14',
        assignedTo: 'Electrical Team',
        estimatedCost: 1200
    },
    {
        id: 'RPR-003',
        equipment: 'Concrete Pump',
        type: 'Mechanical',
        priority: 'Medium',
        status: 'Open',
        description: 'Unusual noise from pump motor, requires inspection',
        reporter: 'Carlos Martinez',
        dateReported: '2025-07-12',
        assignedTo: null,
        estimatedCost: 800
    },
    {
        id: 'RPR-004',
        equipment: 'Elevator',
        type: 'Safety',
        priority: 'High',
        status: 'In Progress', 
        description: 'Emergency stop button not functioning properly',
        reporter: 'Lisa Chen',
        dateReported: '2025-07-11',
        assignedTo: 'Safety Team',
        estimatedCost: 600
    },
    {
        id: 'RPR-005',
        equipment: 'Excavator',
        type: 'Maintenance',
        priority: 'Low',
        status: 'Open',
        description: 'Scheduled 500-hour maintenance due',
        reporter: 'System Auto',
        dateReported: '2025-07-10',
        assignedTo: null,
        estimatedCost: 1500
    }
];

function initializeRepairManagement() {
    renderRepairs();
    
    // Event listeners for repair management
    document.getElementById('add-repair-btn')?.addEventListener('click', openRepairModal);
    document.getElementById('close-repair-modal')?.addEventListener('click', closeRepairModal);
    document.getElementById('cancel-repair')?.addEventListener('click', closeRepairModal);
    document.getElementById('submit-repair')?.addEventListener('click', submitRepair);
    
    // Close modal when clicking outside
    document.getElementById('repair-modal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeRepairModal();
        }
    });
}

function renderRepairs() {
    const repairList = document.getElementById('repair-list');
    if (!repairList) return;
    
    const recentRepairs = repairs.slice(0, 3); // Show only 3 most recent
    
    repairList.innerHTML = recentRepairs.map(repair => {
        const priorityClass = `repair-priority-${repair.priority.toLowerCase()}`;
        const statusColor = {
            'Open': 'bg-red-100 text-red-800',
            'In Progress': 'bg-yellow-100 text-yellow-800', 
            'Completed': 'bg-green-100 text-green-800'
        }[repair.status];
        
        const priorityColor = {
            'Critical': 'text-red-600',
            'High': 'text-orange-600',
            'Medium': 'text-yellow-600',
            'Low': 'text-green-600'
        }[repair.priority];
        
        return `
            <div class="repair-item bg-gray-50 rounded-lg p-3 border ${priorityClass}">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <span class="text-sm font-medium text-gray-900">${repair.id}</span>
                        <span class="text-xs text-gray-500 ml-2">${repair.equipment}</span>
                    </div>
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColor}">
                        ${repair.status}
                    </span>
                </div>
                <p class="text-xs text-gray-600 mb-2">${repair.description}</p>
                <div class="flex justify-between items-center text-xs text-gray-500">
                    <span class="${priorityColor} font-medium">
                        <i class="fas fa-exclamation-triangle mr-1"></i>${repair.priority}
                    </span>
                    <span>$${repair.estimatedCost.toLocaleString()}</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Update stats
    const openCount = repairs.filter(r => r.status === 'Open').length;
    const inProgressCount = repairs.filter(r => r.status === 'In Progress').length;
    const completedCount = repairs.filter(r => r.status === 'Completed').length;
    
    document.getElementById('open-repairs').textContent = openCount;
    document.getElementById('in-progress-repairs').textContent = inProgressCount;
    document.getElementById('completed-repairs').textContent = completedCount;
}

function openRepairModal() {
    document.getElementById('repair-modal')?.classList.remove('hidden');
}

function closeRepairModal() {
    document.getElementById('repair-modal')?.classList.add('hidden');
    document.getElementById('repair-form')?.reset();
}

function submitRepair() {
    const equipment = document.getElementById('repair-equipment').value;
    const type = document.getElementById('repair-type').value;
    const priority = document.getElementById('repair-priority').value;
    const description = document.getElementById('repair-description').value;
    const reporter = document.getElementById('repair-reporter').value;

    if (!equipment || !type || !description) {
        showDesktopNotification('Please fill in all required fields', 'error');
        return;
    }

    const newRepair = {
        id: generateRepairId(),
        equipment,
        type,
        priority,
        status: 'Open',
        description,
        reporter,
        dateReported: new Date().toISOString().split('T')[0],
        assignedTo: null,
        estimatedCost: Math.floor(Math.random() * 3000) + 500 // Random cost for demo
    };

    repairs.unshift(newRepair); // Add to beginning of array
    renderRepairs();
    closeRepairModal();
    
    showDesktopNotification(`Repair ${newRepair.id} submitted successfully`, 'success');
    updateStatusBar(`New repair ${newRepair.id} submitted`);
}

function generateRepairId() {
    return `RPR-${String(repairs.length + 1).padStart(3, '0')}`;
}

// Task Management
function initializeTaskManagement() {
    // Task completion toggle
    document.querySelectorAll('.task-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            if (this.checked) {
                taskItem.classList.add('opacity-70');
                updateStatusBar('Task completed');
            } else {
                taskItem.classList.remove('opacity-70');
                updateStatusBar('Task reopened');
            }
        });
    });
}

// Desktop-specific notifications
function showDesktopNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 text-sm max-w-sm animate-fade-in z-50 border-l-4 ${
        type === 'success' ? 'border-green-500' : 
        type === 'error' ? 'border-red-500' : 
        'border-blue-500'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0">
                <i class="fas ${
                    type === 'success' ? 'fa-check-circle text-green-500' : 
                    type === 'error' ? 'fa-exclamation-triangle text-red-500' : 
                    'fa-info-circle text-blue-500'
                }"></i>
            </div>
            <div class="ml-3 flex-1">
                <p class="font-medium text-gray-900">${message}</p>
                <p class="text-xs text-gray-500 mt-1">${new Date().toLocaleTimeString()}</p>
            </div>
            <button class="ml-3 text-gray-400 hover:text-gray-500" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Real-time updates simulation
function startRealtimeUpdates() {
    // Simulate real-time collaboration updates
    setInterval(() => {
        if (Math.random() > 0.8) {
            const notifications = [
                "Sarah updated structural drawings",
                "Mike completed foundation inspection", 
                "New message from the project manager",
                "Material delivery scheduled for tomorrow",
                "Weather alert: Rain expected",
                "Quality inspection passed"
            ];
            
            const message = notifications[Math.floor(Math.random() * notifications.length)];
            showDesktopNotification(message, 'info');
        }
    }, 15000); // Every 15 seconds
    
    // Update sync status
    setInterval(() => {
        const syncElement = document.getElementById('sync-status');
        if (syncElement) {
            syncElement.innerHTML = `
                <i class="fas fa-sync-alt text-green-500 mr-1"></i>
                Synced
            `;
        }
    }, 5000);
}

// Global functions for menu integration
window.openRepairModal = openRepairModal;
window.refreshApplicationData = refreshApplicationData;