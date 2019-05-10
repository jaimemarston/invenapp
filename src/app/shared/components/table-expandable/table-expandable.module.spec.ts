import { TableExpandableModule } from './table-expandable.module';

describe('TableExpandableModule', () => {
  let tableExpandableModule: TableExpandableModule;

  beforeEach(() => {
    tableExpandableModule = new TableExpandableModule();
  });

  it('should create an instance', () => {
    expect(tableExpandableModule).toBeTruthy();
  });
});
