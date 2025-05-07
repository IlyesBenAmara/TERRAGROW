import { Component, computed, effect, signal } from '@angular/core';
import { Bande, Parcelle, ParcelleService } from './services/parcelle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  parcelles = signal<Parcelle[]>([]);
  selectedParcelle = signal<Parcelle | null>(null);
  bandes = signal<Bande[]>([]);
  newParcelleForm = signal<{ nom: string; longueur: number; largeur: number }>({
    nom: '',
    longueur: 0,
    largeur: 0,
  });

  constructor(private parcelleService: ParcelleService) {
    effect(() => {
      this.parcelleService
        .getParcelles()
        .subscribe((response) => this.parcelles.set(response.data));
    });

    effect(() => {
      const parcelle = this.selectedParcelle();
      if (!parcelle) {
        this.selectedParcelle.set(null);
        return;
      }

      this.parcelleService.getBandes(parcelle.id).subscribe((response) => {
        this.bandes.set(response.data);
      });
    });
  }

  selectParcelle(parcelle: Parcelle) {
    this.selectedParcelle.set(parcelle);
  }

  isSelected = (parcelle: Parcelle) =>
    computed(() => this.selectedParcelle()?.id === parcelle.id);

  updateNewParcelleField(field: 'nom' | 'longueur' | 'largeur', value: string) {
    this.newParcelleForm.set({
      ...this.newParcelleForm(),
      [field]: value,
    });
  }

  handleInput(event: Event, field: 'nom' | 'longueur' | 'largeur') {
    const input = event.target as HTMLInputElement;
    this.updateNewParcelleField(field, input.value);
  }

  createParcelle() {
    const parcelleData = this.newParcelleForm();

    this.parcelleService
      .createParcelle({
        nom: parcelleData.nom,
        longueur: +parcelleData.longueur,
        largeur: +parcelleData.largeur,
      })
      .subscribe((response) => {
        this.parcelles.update((list) => [...list, response.data]);
        this.newParcelleForm.set({ nom: '', longueur: 0, largeur: 0 });
      });
  }
}
