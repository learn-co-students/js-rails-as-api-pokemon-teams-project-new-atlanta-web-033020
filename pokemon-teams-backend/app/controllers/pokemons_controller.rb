class PokemonsController < ApplicationController
    def index
        @pokemons = Pokemon.all
        render json: @pokemons, except: [:created_at, :updated_at]
    end

    def destroy
        @pokemon = Pokemon.find_by(id: params[:id])
        byebug
        if @pokemon
            @pokemon.destroy
            render json: @pokemon, status: :ok
        else
            render json: { errors: ['Pokemon not found']}, status: :unprocessible_entity
            
        end
    end
end
