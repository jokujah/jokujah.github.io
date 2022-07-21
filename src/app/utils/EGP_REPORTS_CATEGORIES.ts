export function getEGPCategories() {  
  let egpCategories = [
    {
      'name': 'Planning',
      'route': 'planning',
      'reports': [
        {
          'name': 'Planing And Forecasting Report',
          'route': 'planning-and-forecasting-report'
        }
      ]
    },
    {
      'name': 'Initiation',
      'route': 'initiation',
      'reports': [
        {
          'name': 'Late Initiation Report',
          'route': 'late-initiation-report'
        }
      ]
    },
    {
      'name': 'Solicitation',
      'route': 'solicitation',
      'reports': [
        {
          'name': 'PDE Bid Average Report',
          'route': 'pde-bid-average-report'
        }
      ]
    },
    {
      'name': 'Evaluation',
      'route': 'evaluation',
      'reports': [
        {
          'name': 'Due Diligence Report',
          'route': 'due-diligence-report'
        }
      ]
    },
    {
      'name': 'Supplier/Provider',
      'route': 'supplier-portal',
      'reports': [
        {
          'name': 'Suspended Providers Report',
          'route': 'suspended-providers-report'
        }
      ]
    },
    {
      'name': 'Contracting',
      'route': 'contracting',
      'reports': [
        {
          "name": 'Awarded Contract Report',
          "route": 'awarded-contract-report'
        },
        {
          "name": 'Administrative Review Report',
          "route": 'administrative-review-report'
        },
        {
          "name": 'Signed Contract Report',
          "route": 'signed-contracts-report'
        },
        {
          //"name":'PDE Average Contract Value Report',
          "name": 'Number of Contracts, Total Value, Average Value by Procuring Entity',
          "route": 'pde-average-contract-value-report'
        },
        {
          //"name":'Procurement Method Average Contract Value Report',
          "name": 'Number of Contracts, Total Value, Average Value by Procurement Method',
          "route": 'procurement-method-average-contract-value-report'
        },
        {
          "name": 'Procurement Report',
          "route": 'procurement-report'
        },
        {
          "name": 'Micro Procurement Report',
          "route": 'micro-procurement-report'
        },
      ]
    },
    {
      'name': 'Contract Management',
      'route': 'contract-management',
      'reports': [
        {
          "name": 'Cancelled Tender Report',
          "route": 'cancelled-tender-report'
        },
        {
          "name": 'Completed Contracts Report',
          "route": 'completed-contracts-report'
        },
        {
          "name": 'Frame Work Report',
          "route": 'frame-work-report'
        },
        {
          "name": 'Terminated Contracts Report',
          "route": 'terminated-contracts-report'
        },
        {
          "name": 'Provider Perfomance Report',
          "route": 'provider-performance-report'
        },
        {
          "name": 'Actual Vs Planned Procurement Report',
          "route": 'actual-vs-planned-procurement-report'
        },
        {
          "name": 'Completed Contracts On Time Report',
          "route": 'contracts-completed-on-time-report'
        },
        {
          "name": 'Procurements Awarded To Suspended Providers Report',
          "route": 'procurements-awarded-to-suspended-providers-report'
        },
        {
          "name": 'Contract Management Report',
          "route": 'contract-management-report'
        }
      ]
    },
    {
      'name': 'Disposals',
      'route': 'disposal',
      'reports': [
        {
          'name': 'Disposals Report',
          'route': 'disposal-report'
        }
      ]
    },
  ]
  return egpCategories
}