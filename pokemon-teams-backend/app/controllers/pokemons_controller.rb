class PokemonsController < ApplicationController
    def index
        @pokemons = Pokemon.all
        render json: @pokemons, except: [:created_at, :updated_at]
    end

    def created
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        @trainer = Trainer.find_by(id: params[:id])
        @pokemon = Pokemon.new(name: name, species: species, trainer_id: @trainer.id)
        if @trainer.pokemons.length < 6
            if @pokemon.save
                render json: @pokemon
            else
                render json: { errors: ['Failed to create, try again']}, status: :unprocessible_entity
            end
        elsif @trainer.pokemons.length >= 6
            render json: { errors: ['#{trainer.name} already has a full team']}, status: :unauthorized
        else
            render json: { errors: ['That trainer could not be found']}, status: unprocessible_entity
        end
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
endk
