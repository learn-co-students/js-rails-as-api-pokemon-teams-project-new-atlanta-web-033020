class PokemonsController < ApplicationController
    def index
        @pokemons = Pokemon.all
        render json: @pokemons, except: [:created_at, :updated_at]
    end
end
