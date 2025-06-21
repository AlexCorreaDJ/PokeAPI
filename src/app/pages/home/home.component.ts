import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { PokemonService, Pokemon } from '../../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomeComponent implements OnInit {
  pokemons: Pokemon[] = [];
  loading = true;
  error = false;
  offset = 0;
  limit = 20;
  Math = Math; // Para uso no template

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.loading = true;
    this.error = false;
    
    this.pokemonService.getPokemons(this.offset, this.limit).subscribe({
      next: (pokemons) => {
        this.pokemons = pokemons;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar Pokémons:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  onPokemonClick(pokemon: Pokemon) {
    this.router.navigate(['/details', pokemon.id]);
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }

  goToPreviousPage() {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.loadPokemons();
    }
  }

  goToNextPage() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  isPreviousDisabled(): boolean {
    return this.offset === 0;
  }
} 