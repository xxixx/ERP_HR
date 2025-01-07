export interface DefectiveModel {
    no: number;
  DATE: string;
  PART: string;
  CATEGORY: string;
  SUB_CATEGORY: string;
  COUNT: number;
  SUM: number;
  ETC: string;
  total_count: number;
  CREATED_DATE: string;
  items: DefectiveModel[]
  }
  export interface DefectiveCategoryModel {
    PART: string;
  DESCRIPTIONS: string;
  CATEGORY: string;
  SUB_CATEGORY: string;
  PATERNER: string;
  PARENT_CAT: string;
  filter: string;
  part_count: number;
  }
  