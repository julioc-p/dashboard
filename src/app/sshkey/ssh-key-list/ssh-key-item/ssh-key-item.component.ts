import { SSHKeyEntity } from 'app/shared/entity/SSHKeyEntity';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'app/core/services/api/api.service';

@Component({
  selector: 'kubermatic-ssh-key-item',
  templateUrl: './ssh-key-item.component.html',
  styleUrls: ['./ssh-key-item.component.scss']
})
export class SshKeyItemComponent implements OnInit {
  @Input() sshKey: SSHKeyEntity;
  @Input() isOdd: boolean;
  @Output() deleteSshKey: EventEmitter<SSHKeyEntity> = new EventEmitter();

  public isShowPublicKey = false;
  public publicKeyName: string;
  public publicKey: string;

  constructor(private api: ApiService) { }

  public ngOnInit(): void {
    this.publicKeyName = this.sshKey.spec.publicKey.split(' ')[0];

    this.publicKey = this.sshKey.spec.publicKey.slice(this.publicKeyName.length + 1, -1);
  }

  public deleteSSHKey(): void {
    this.api.deleteSSHKey(this.sshKey.metadata.name).subscribe(() => {
      this.deleteSshKey.emit(this.sshKey);
    });
  }

  public togglePublicKey(): void {
    this.isShowPublicKey = !this.isShowPublicKey;
  }

}
