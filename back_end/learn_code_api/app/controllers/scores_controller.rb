class ScoresController < ApplicationController

def index
    render json: Score.all
end

def create
    @score= Score.create(scores_params)
    render json: Score.all
end

private

def scores_params
    params.permit(:player_name, :score)
end

end
