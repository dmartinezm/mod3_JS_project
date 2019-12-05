class ScoresController < ApplicationController

    def index
        render json: Score.all.sort_by{|x| x[:score]}.reverse[0..9]
    end
    
    def create
        @score= Score.create(scores_params)
        render json: Score.all.sort_by{|x| x[:score]}.reverse[0..9]
    end

private

def scores_params
    params.permit(:player_name, :score)
end

end
