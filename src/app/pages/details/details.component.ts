import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService, PokemonDetails } from '../../services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailsComponent implements OnInit {
  pokemonId: number = 0;
  pokemon: PokemonDetails | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pokemonId = +params['id'];
      if (this.pokemonId) {
        this.loadPokemonDetails();
      } else {
        this.error = true;
        this.loading = false;
      }
    });
  }

  loadPokemonDetails() {
    this.loading = true;
    this.error = false;
    
    this.pokemonService.getPokemonDetails(this.pokemonId).subscribe({
      next: (pokemon: PokemonDetails) => {
        this.pokemon = pokemon;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar detalhes do Pokémon:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }

  getTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = {
      'normal': 'medium',
      'fire': 'danger',
      'water': 'primary',
      'electric': 'warning',
      'grass': 'success',
      'ice': 'primary',
      'fighting': 'danger',
      'poison': 'tertiary',
      'ground': 'warning',
      'flying': 'medium',
      'psychic': 'tertiary',
      'bug': 'success',
      'rock': 'warning',
      'ghost': 'dark',
      'dragon': 'danger',
      'dark': 'dark',
      'steel': 'medium',
      'fairy': 'tertiary'
    };
    return typeColors[type.toLowerCase()] || 'medium';
  }

  getStatColor(value: number): string {
    if (value >= 100) return 'success';
    if (value >= 80) return 'warning';
    if (value >= 60) return 'primary';
    return 'medium';
  }
} 