class BaseEntities{
  private isDelete: boolean;
  private createTime: Date;
  private updateTime: Date;
  private isActive: boolean;

    public isIsDelete(): boolean {
        return this.isDelete;
    }

    public setIsDelete(isDelete: boolean): void {
        this.isDelete = isDelete;
    }

    public getCreateTime(): Date {
        return this.createTime;
    }

    public setCreateTime(createTime: Date): void {
        this.createTime = createTime;
    }

    public getUpdateTime(): Date {
        return this.updateTime;
    }

    public setUpdateTime(updateTime: Date): void {
        this.updateTime = updateTime;
    }

    public isIsActive(): boolean {
        return this.isActive;
    }

    public setIsActive(isActive: boolean): void {
        this.isActive = isActive;
    }


  
  constructor() {
    this.isDelete = false;
    this.createTime = new Date();
    this.updateTime = new Date();
    this.isActive = true;
  }
}

export { BaseEntities };
