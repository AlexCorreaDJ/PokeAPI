import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  baseExperience: number;
  stats: Array<{
    name: string;
    value: number;
  }>;
  images: {
    default: string;
    shiny: string;
  };
}

export interface PokeApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokeApiDetailsResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemons(offset: number = 0, limit: number = 20): Observable<Pokemon[]> {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    return this.http.get<PokeApiResponse>(url).pipe(
      map(response => {
        return response.results.map(pokemon => {
          // Extrair o ID da URL (ex: da URL ".../pokemon/25/", o ID é 25)
          const id = this.extractIdFromUrl(pokemon.url);
          
          // Montar a URL da imagem frontal
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          
          return {
            id,
            name: pokemon.name,
            image
          };
        });
      })
    );
  }

  getPokemonDetails(id: number): Observable<PokemonDetails> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    
    return this.http.get<PokeApiDetailsResponse>(url).pipe(
      map(response => {
        return {
          id: response.id,
          name: response.name,
          height: response.height / 10, // Converter de decímetros para metros
          weight: response.weight / 10, // Converter de hectogramas para kg
          types: response.types.map(type => type.type.name),
          abilities: response.abilities.map(ability => ability.ability.name),
          baseExperience: response.base_experience,
          stats: response.stats.map(stat => ({
            name: this.formatStatName(stat.stat.name),
            value: stat.base_stat
          })),
          images: {
            default: response.sprites.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            shiny: response.sprites.front_shiny || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
          }
        };
      })
    );
  }

  private extractIdFromUrl(url: string): number {
    // A URL tem o formato: "https://pokeapi.co/api/v2/pokemon/25/"
    const parts = url.split('/');
    // O ID está na penúltima posição (antes do último "/")
    return parseInt(parts[parts.length - 2]);
  }

  private formatStatName(statName: string): string {
    const statMap: { [key: string]: string } = {
      'hp': 'HP',
      'attack': 'Ataque',
      'defense': 'Defesa',
      'special-attack': 'Ataque Especial',
      'special-defense': 'Defesa Especial',
      'speed': 'Velocidade'
    };
    return statMap[statName] || statName;
  }
} 