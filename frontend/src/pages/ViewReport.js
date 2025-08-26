import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import healthDataService from '../services/healthDataService';

function ViewReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await healthDataService.getHealthDataById(id);
      setReport(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch report');
      navigate('/reports');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setIsUpdating(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const response = await axios.put(`/api/health-data/${id}`, {
        status: newStatus,
        notes: report.notes
      }, config);

      setReport(response.data.data);
      toast.success(`Report ${newStatus} successfully`);
    } catch (error) {
      console.error('Error updating report status:', error);
      toast.error(error.response?.data?.message || `Failed to ${newStatus} report`);
    } finally {
      setIsUpdating(false);
    }
  };

  const renderActionButtons = () => {
    if (!['super-admin', 'state-admin'].includes(user.role)) {
      return null;
    }

    return (
      <div className="report-actions" style={{ marginTop: '20px', gap: '10px', display: 'flex' }}>
        {report.status !== 'approved' && (
          <button
            className="btn btn-success"
            onClick={() => handleStatusUpdate('approved')}
            disabled={isUpdating}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: isUpdating ? 'not-allowed' : 'pointer',
              opacity: isUpdating ? 0.7 : 1
            }}
          >
            {isUpdating ? 'Approving...' : 'Approve Report'}
          </button>
        )}
        
        {report.status !== 'rejected' && (
          <button
            className="btn btn-danger"
            onClick={() => handleStatusUpdate('rejected')}
            disabled={isUpdating}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: isUpdating ? 'not-allowed' : 'pointer',
              opacity: isUpdating ? 0.7 : 1
            }}
          >
            {isUpdating ? 'Rejecting...' : 'Reject Report'}
          </button>
        )}
      </div>
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'draft': return 'status-draft';
      case 'submitted': return 'status-submitted';
      case 'reviewed': return 'status-reviewed';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading report...</div>;
  }

  if (!report) {
    return <div className="error">Report not found</div>;
  }

  return (
    <div className="report-view">
      <div className="report-header">
        <h1>Health Data Report</h1>
        <div className="report-actions">
          <button className="btn" onClick={() => navigate('/view-reports')}>
            Back to Reports
          </button>
          {(report.status === 'draft' || ['super-admin', 'state-admin', 'district-admin'].includes(user.role)) && (
            <button 
              className="btn btn-primary"
              onClick={() => navigate(`/report/${id}/edit`)}
            >
              Edit Report
            </button>
          )}
        </div>
      </div>

      <div className="report-info">
        <div className="info-section">
          <h2>Basic Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Facility</label>
              <span>{report.facility?.name || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Name</label>
              <span>{report.submittedBy?.name || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Reporting Period</label>
              <span>{report.reportingPeriod?.year} - {report.reportingPeriod?.month}</span>
            </div>
            <div className="info-item">
              <label>Status</label>
              <span className={getStatusClass(report.status)}>
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </span>
            </div>
          </div>
          {renderActionButtons()}
        </div>

        <div className="info-section">
          <h2>Submission Details</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Submitted By</label>
              <span>{report.submittedBy?.name || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Submission Date</label>
              <span>{formatDate(report.submittedAt)}</span>
            </div>
            {report.reviewedBy && (
              <div className="info-item">
                <label>Reviewed By</label>
                <span>{report.reviewedBy.name}</span>
              </div>
            )}
            {report.approvedBy && (
              <div className="info-item">
                <label>Approved By</label>
                <span>{report.approvedBy.name}</span>
              </div>
            )}
            {report.rejectedBy && (
              <div className="info-item">
                <label>Rejected By</label>
                <span>{report.rejectedBy.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <h2>Health Data</h2>
          <div className="health-data-grid">
            {Object.entries(report.healthData).map(([category, data]) => (
              <div key={category} className="health-data-category">
                <h3>{category}</h3>
                <div className="data-grid">
                  {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="data-item">
                      <label>{key}</label>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {report.notes && (
          <div className="info-section">
            <h2>Notes</h2>
            <p>{report.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewReport;