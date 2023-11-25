export interface RankOption {
    readonly value: string;
    readonly label: string;
    readonly rank: string;
    readonly isFixed?: boolean;
  }

  export const rankOptions: readonly RankOption[] = [
    {value: 'AB', label: 'AB', rank:'AB'},
    {value: 'Amn', label: 'Amn', rank:'Amn'},
    {value: 'A1C', label: 'SrA', rank:'SrA'},
    {value: 'SSgt', label: 'SSgt', rank:'SSgt'},
    {value: 'TSgt', label: 'TSgt', rank:'Tsgt'},
    {value: 'MSgt', label: 'MSgt', rank:'MSgt'},
    {value: 'SMSgt', label: 'SMSgt', rank:'SMSgt'},
    {value: 'CMSgt', label: 'CMSgt', rank:'CMSgt'},
    {value: 'CCM', label: 'CCM', rank:'CCM'},
    {value: 'CMSAF', label: 'CMSAF', rank:'CMSAF'},
    {value: '2d Lt', label: '2d Lt', rank:'2d Lt'},
    {value: '1st Lt', label: '1st Lt', rank:'1st Lt'},
    {value: 'Capt', label: 'Capt', rank:'Capt'},
    {value: 'Maj', label: 'Maj', rank:'Maj'},
    {value: 'Lt Col', label: 'Lt Col', rank:'Lt Col'},
    {value: 'Col', label: 'Col', rank:'Col'},
    {value: 'Brig Gen', label: 'Brig Gen', rank:'Brig Gen'},
    {value: 'Maj Gen', label: 'Maj Gen', rank:'Maj Gen'},
    {value: 'Lt Gen', label: 'Lt Gen', rank:'Lt Gen'},
    {value: 'Gen', label: 'Gen', rank:'Gen'},
    {value: 'GOAF', label: 'GOAF', rank:'GOAF'},
  ];

  export interface FlightOption {
    readonly value: string;
    readonly label: string;
    readonly flight: string;
    readonly isFixed?: boolean;
  }

  export const flightOptions: readonly FlightOption[] = [
    {value:'CMD', label:'CMD', flight:"CMD"},
    {value:'SCO1', label:'SCO1', flight:"SCO1"},
    {value:'SCO2', label:'SCO2', flight:"SCO2"},
    {value:'SCP', label:'SCP', flight:"SCP"},
  ];

  export interface TeamOption {
    readonly value: string;
    readonly label: string;
    readonly team: string;
    readonly isFixed?: boolean;
  }

  export const teamOptions: readonly TeamOption[] = [
    {value:'222ALL', label:'222ALL', team:"222ALL"},
    {value:'PTL', label:'PTL', team:"PTL"},
    {value:'Training', label:'Training', team:"Training"},
    {value:'Booster', label:'Booster', team:"Booster"},
    {value:'Top3', label:'Top3', team:"Top3"},
    {value:'Rising6', label:'Rising6', team:"Rising6"},
    {value:'Flt Leadership', label:'Flt Leadership', team:"Flt Leadership"},
    {value:'DOMOPS', label:'DOMOPS', team:"DOMOPS"},
    {value:'Viewer', label:'Viewer', team:"Viwer"},
  ];

  export interface WCOption {
    readonly value: string;
    readonly label: string;
    readonly workcenter: string;
    readonly isFixed?: boolean;
  }

  export const wcOptions: readonly WCOption[] = [
    {value:'SCOP', label:'SCOP', workcenter:"SCOP"},
    {value:'SCOS', label:'SCOS', workcenter:"SCOS"},
    {value:'SCOX', label:'SCOX', workcenter:"SCOX"},
    {value:'SCOI', label:'SOI', workcenter:"SCOI"},
    {value:'SCOT', label:'SOT', workcenter:"SCOT"},
  ];

  export interface GroupedOption{
    readonly label: string;
    readonly options: readonly RankOption[] | readonly FlightOption[] | readonly TeamOption[] | readonly WCOption[]; 
  }

  export const groupedOptions: readonly GroupedOption[] = [
    {
      label: 'Rank',
      options: rankOptions,
    },
    {
      label: 'Flight',
      options: flightOptions,
    },
    {
        label: 'Team',
        options: teamOptions,
      },
      {
        label: 'Work Center',
        options: wcOptions,
      },
  ];
  